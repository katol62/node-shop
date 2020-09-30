import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {detailsPath, loginPath, profilePath} from "../misc/constants";
import {AuthService} from "../services/auth.service";

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
    const token = this.authenticationService.token;
    if (!this.authenticationService.isTokenExpired(token)) {
      return true;
    }
    this.router.navigate([profilePath, loginPath]);
    return false;
  }

}
