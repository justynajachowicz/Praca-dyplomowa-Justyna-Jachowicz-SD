import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Check if user is logged in and is NOT an admin
    if (this.authService.isLoggedIn() && !this.authService.isAdmin()) {
      return true;
    }

    // If admin or not logged in, redirect to dashboard
    this.router.navigate(['/dashboard']);
    return false;
  }
}