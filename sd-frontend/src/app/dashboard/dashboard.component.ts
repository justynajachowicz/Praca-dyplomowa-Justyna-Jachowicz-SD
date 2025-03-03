import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Import Router
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private authService: AuthService, private router: Router) {}

  // Metoda wylogowania
  onLogout() {
    this.authService.logout();  // Wywołanie metody logout z serwisu AuthService
    this.router.navigate(['/login']);  // Przekierowanie na stronę logowania
  }
  goToUserManagement() {
    this.router.navigate(['/admin/users']);
  }

}
