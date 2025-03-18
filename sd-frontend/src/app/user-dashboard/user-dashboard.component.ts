import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Twój serwis autoryzacji

@Component({
    selector: 'app-user-dashboard',
    templateUrl: './user-dashboard.component.html',
    styleUrls: ['./user-dashboard.component.css'],
    standalone: false
})
export class UserDashboardComponent {

  constructor(private authService: AuthService, private router: Router) {}

  onLogout(): void {
    this.authService.logout();  // Logika wylogowania użytkownika
    this.router.navigate(['/login']);  // Przekierowanie do strony logowania
  }

  goToShoppingList(): void {
    this.router.navigate(['/shopping-list']);  // Przekierowanie do listy zakupów
  }

  goToUserProfile(): void {
    this.router.navigate(['/user-profile']);  // Przekierowanie do profilu użytkownika
  }

}