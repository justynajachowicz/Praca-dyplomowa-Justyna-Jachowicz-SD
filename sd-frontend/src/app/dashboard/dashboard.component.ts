import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { AuthService } from '../services/auth.service';
import {CitySearchComponent} from "../city-search/city-search.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    CitySearchComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToUserManagement() {
    this.router.navigate(['/admin/users']);
  }

}
