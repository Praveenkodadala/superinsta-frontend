import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authLoginGuardGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const authService = inject(AuthService); // Inject AuthService directly within the guard
  const router = inject(Router); // Inject Router directly within the guard

  if (!authService.isLoggedIn()) {
    router.navigateByUrl('login'); // Redirect to login if not logged in
    return false;
  }

  return true; // Allow navigation if logged in
};
