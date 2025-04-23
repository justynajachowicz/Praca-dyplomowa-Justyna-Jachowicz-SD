import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Check if user is logged in and has admin role
    if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
      return true;
    }

    // If not admin, redirect to dashboard
    this.router.navigate(['/dashboard']);
    return false;
  }
}
