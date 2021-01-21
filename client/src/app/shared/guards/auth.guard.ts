import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {loginPath, profilePath} from "../misc/constants";
import {AuthService} from "../services/auth.service";
import {catchError, map} from "rxjs/operators";

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(
		private router: Router,
		private authenticationService: AuthService
	) {
	}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.authenticationService.isAuthenticated()
			.pipe(
				map( (isAuthenticated: boolean) => {
					if (!isAuthenticated) {
						this.router.navigate([profilePath, loginPath]);
						return false
					} else {
						return true;
					}
				}),
				catchError((error, caught) => {
					this.router.navigate([profilePath, loginPath]);
					return of(false)
				})
			)
	}

}
