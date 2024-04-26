import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IsUserAuthenticated } from './authenticationFunction';
import { UserRole } from '../Enums/userRole';

@Injectable({
  providedIn: 'root'
})
export class ClientAuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (IsUserAuthenticated(UserRole.Client)) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
