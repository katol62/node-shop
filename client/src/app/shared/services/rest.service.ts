import {Injectable, Injector} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {IBaseRequest, IBaseResponse} from '../misc/http-data';
import {catchError} from 'rxjs/operators';
import {IMessageItem, NotificationMessageType, NotificationService} from './notification.service';

export const API_URL = environment.apiUrl;

const JSON_HEADERS = new HttpHeaders({'Content-Type': 'application/json'});
const FORM_HEADERS = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
const UPLOAD_HEADERS = new HttpHeaders({'Content-Type': 'multipart/form-data'});

@Injectable({
    providedIn: 'root'
})
export class RestService {

    protected http: HttpClient;
    protected notificationService: NotificationService;

    public url: string = API_URL;

    constructor( protected injector: Injector) {
        this.http = injector.get(HttpClient);
        this.notificationService = injector.get(NotificationService);
    }
    post<I extends IBaseRequest, O extends IBaseResponse>(url: string, data?: I): Observable<O> {
        return this.http.post<O>(`${this.url}/${url}`, data, {headers: JSON_HEADERS}).pipe(
            catchError((response: HttpErrorResponse) => this.handleError(data))
        );
    }

    postUpload<I extends IBaseRequest, O extends IBaseResponse>(url: string, data?: I): Observable<O> {
        return this.http.post<O>(`${this.url}/${url}`, data, {headers: FORM_HEADERS}).pipe(
            catchError((response: HttpErrorResponse) => this.handleError(data))
        );
    }

    get<I extends IBaseRequest, O extends IBaseResponse>(url: string, params?: any): Observable<O> {
        return this.http.get<O>(`${this.url}/${url}`, {headers: JSON_HEADERS, params}).pipe(
            catchError((response: HttpErrorResponse) => this.handleError(response))
        );
    }

    put<I extends IBaseRequest, O extends IBaseResponse>(url: string, data?: I, headers?: HttpHeaders): Observable<O> {
        return this.http.put<O>(`${this.url}/${url}`, data, {headers: JSON_HEADERS}).pipe(
            catchError((response: HttpErrorResponse) => this.handleError(response))
        );
    }

    delete<I extends IBaseRequest, O extends IBaseResponse>(url: string, data?: I, headers?: HttpHeaders): Observable<O> {
        return this.http.delete<O>(`${this.url}/${url}`, {headers: JSON_HEADERS}).pipe(
            catchError((response: HttpErrorResponse) => this.handleError(response))
        );
    }

    postForm<I extends IBaseRequest, O extends IBaseResponse>(url: string, data?: I, headers?: HttpHeaders): Observable<O> {
        const dataStr = Object.keys(data).map(key => `${key}=${data[key]}`).join('&');
        return this.http.post<O>(`${API_URL}/${url}`, dataStr, {headers: FORM_HEADERS}).pipe(
            catchError((response: HttpErrorResponse) => this.handleError(response))
        );
    }

    private handleError(error: HttpErrorResponse | any): Observable<any> {
        console.log('ApiService::handleError', error.error);
        // const text = error.statusText ? error.statusText : (error.error && error.error.code ? error.error.code : (error.error && error.error.message ? error.error.message : 'Unknown error'));
        const text = error.error && error.error.code ? error.error.code : (error.error && error.error.message ? error.error.message : (error.statusText ? error.statusText : 'Unknown error'));
        const message: IMessageItem = {message: text, messageCode: error.status, type: NotificationMessageType.error};
        this.notificationService.show(message);
        return throwError(error);
    }

}
