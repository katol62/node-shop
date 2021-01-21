import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {loginPath, profilePath} from "../misc/constants";
import {IAuthResponse} from "../misc/http-data";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private authenticationService: AuthService,
        private router: Router
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = this.addHeaders(request);
        if (this.authenticationService.token) {
            request = this.addToken(request, this.authenticationService.token);
        }

        return next.handle(request).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                return this.handle401Error(request, next);
            } else {
                return throwError(error);
            }
        }));

    }

    private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
        return request.clone({
            setHeaders: {
                'x-access-token': `${token}`,
            }
        });
    }

    private addHeaders(request: HttpRequest<any>): HttpRequest<any> {
        return request.clone({
            setHeaders: {
                'Access-Control-Allow-Origin': '* always',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization, access-control-allow-methods',
            }
        });
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authenticationService.refresh().pipe(
                switchMap((result: IAuthResponse) => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(result.data.token);
                    return next.handle(this.addToken(request, result.data.token));
                }),
                catchError( (err, caught) => {
                    this.isRefreshing = false;
                    this.router.navigate([profilePath, loginPath]);
                    return throwError(err);
                })
            );

        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(jwt => {
                    return next.handle(this.addToken(request, jwt));
                }),
                catchError( (err, caught) => {
                    this.router.navigate([profilePath, loginPath]);
                    return throwError(err);
                })
            );
        }
    }
}
