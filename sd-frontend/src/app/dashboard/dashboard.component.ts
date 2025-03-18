import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { AuthService } from '../services/auth.service';
import {CitySearchComponent} from "../city-search/city-search.component";
import {CommonModule, NgIf} from "@angular/common";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CitySearchComponent,
    RouterLink,
    NgIf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(public authService: AuthService, private router: Router) {}
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToUserManagement() {
    this.router.navigate(['/admin/users']);
  }


}
