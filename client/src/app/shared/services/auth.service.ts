import {Injectable, Injector} from '@angular/core';
import {RestService} from './rest.service';
import {PersistentService} from './persistent.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {IAuthRefreshRequest, IAuthRequest, IAuthResponse, IUser} from '../misc/http-data';
import * as jwt_decode from 'jwt-decode';
import {catchError, map, tap} from 'rxjs/operators';
import {IBaseResponse} from "../../../../../server/src/misc/db";

export const STORAGE_KEY_LOGIN = 'authData';

export interface IToken {
    phone?: string;
    exp?: number;
    iat?: number;
    id?: number;
    role?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService extends RestService  {

    private authData: BehaviorSubject<IAuthResponse>;

    constructor(protected injector: Injector,
                private storage: PersistentService) {
        super(injector);
        this.authData = new BehaviorSubject(this.storage.getItem(STORAGE_KEY_LOGIN));
    }

    public get authInfo(): Observable<IAuthResponse> {
        return this.authData.asObservable();
    }

    public get token(): string {
        const value: IAuthResponse = this.authData.value;
        return value === null ? null : (this.isTokenExpired(value.token) ? null : value.token);
    }
    public get user(): IUser {
        const value: IAuthResponse = this.authData.value;
        return value === null ? null : value.user;
    }
    public get refreshToken(): string {
        const value: IAuthResponse = this.authData.value;
        return value === null ? null : value.refreshToken;
    }
    public get deviceToken(): string {
        const value: IAuthResponse = this.authData.value;
        return value == null ? null : value.user.deviceId;
    }

    public login(req: IAuthRequest): Observable<IAuthResponse> {
        return this.postForm('auth', req)
            .pipe(
                map((result: IAuthResponse) => this.setLoginToStorage(result)),
                tap((result: IAuthResponse) => {
                    this.afterLogin();
                    this.authData.next(result.data);
                })
            );
    }

    public refresh(): Observable<IAuthResponse> {
        const req: IAuthRefreshRequest = {phone: this.user.phone, refreshToken: this.refreshToken};
        return this.postForm('auth/refresh', req)
            .pipe(
                map((result: IAuthResponse) => this.setLoginToStorage(result)),
                tap((result: IAuthResponse) => {
                    this.afterLogin();
                    const data = this.authData.value ? this.authData.value : {};
                    this.authData.next({...data, ...result.data});
                })
            );
    }

    public logout(): Observable<IAuthResponse> {
        const req = {phone: this.user.phone, refreshToken: this.refreshToken} as IAuthRequest
        return this.postForm('auth/logout', req)
            .pipe(
                tap( (result: IAuthResponse) => {
                    this.onLogout();
                })
            )

    }

    public onLogout(): void {
        this.authData.complete();
        this.authData = new BehaviorSubject(null);
        this.storage.removeItem(STORAGE_KEY_LOGIN);
    }

    private afterLogin(): void {
    }

    private setLoginToStorage(result: IAuthResponse): IAuthResponse {
        const stored = this.storage.getItem(STORAGE_KEY_LOGIN);
        const data = stored ? {...stored, ...result.data} : {...result.data}
        this.storage.setItem(STORAGE_KEY_LOGIN, data);
        return result;
    }

    getTokenExpirationDate(token: string): Date {
        const decoded: IToken = jwt_decode(token);
        if (decoded.exp === undefined) { return null; }

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    isTokenExpired(token?: string): boolean {
        if (!token) { token = this.token; }
        if (!token) { return true; }

        const date = this.getTokenExpirationDate(token);
        if (date === undefined) { return false; }
        return !(date.valueOf() > new Date().valueOf());
    }

    get role(): string {
        const token = this.token;
        if (!token) { return null; }
        const decoded: IToken = jwt_decode(token);
        return decoded.role ? decoded.role : null;
    }

    get userId(): number {
        const token = this.token;
        if (!token) { return null; }
        const decoded: IToken = jwt_decode(token);
        return decoded.id ? decoded.id : null;
    }

    public isAuthenticated(): Observable<boolean> {
        if (this.isTokenExpired()) {
            if (!this.refreshToken) {
                this.onLogout();
                return of(false);
            }
            return this.refresh()
                .pipe(
                    map((result: IAuthResponse) => {
                        return true
                    }),
                    catchError( (error, caught)  => {
                        this.onLogout();
                        return of(false);
                    })
                )
        } else {
            return of(true);
        }
    }


}
