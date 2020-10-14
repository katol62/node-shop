import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {homePath} from "../misc/constants";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
      private router: Router,
      private authenticationService: AuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const roles = next.data.roles as Array<string>;
    const role = this.authenticationService.role;
    if (roles && roles.length && role && roles.indexOf(role) !== -1) {
      return true;
    }
    this.router.navigate(['/', homePath]);
    return false;
  }

}
