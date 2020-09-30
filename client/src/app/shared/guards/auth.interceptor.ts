import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {loginPath, profilePath} from "../misc/constants";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthService,
        private router: Router
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authenticationService.token;

        if (token) {
            request = request.clone({
                setHeaders: {
                    'x-access-token': `${token}`,
                }
            });
        }

        request = request.clone({
            setHeaders: {
                'Access-Control-Allow-Origin': '* always',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization, access-control-allow-methods',
            }
        });

        return next.handle(request).pipe(
            tap(
                event => {
                    if (event instanceof HttpResponse) {
                        // console.log('Http income', event);
                    }
                },
                err => {
                    console.log('Http error', err);
                    if (err.status === 401 || err.status === 403) {
                        this.authenticationService.onLogout();
                        this.router.navigate([profilePath, loginPath]);
                    }
                }
            )
        );
    }
}
