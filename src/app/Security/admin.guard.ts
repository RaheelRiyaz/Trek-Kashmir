import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IsUserAuthenticated } from './authenticationFunction';
import { UserRole } from '../Enums/userRole';

@Injectable({
  providedIn: "root"
})
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (IsUserAuthenticated(UserRole.Admin)) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
