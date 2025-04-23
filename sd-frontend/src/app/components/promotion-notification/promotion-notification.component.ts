import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../services/favorite.service';
import { Product } from '../../models/models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-promotion-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promotion-notification.component.html',
  styleUrls: ['./promotion-notification.component.css']
})
export class PromotionNotificationComponent implements OnInit {
  promotions: Product[] = [];
  userEmail: string = '';
  loading: boolean = false;
  error: string = '';
  showNotifications: boolean = false;

  constructor(
    private favoriteService: FavoriteService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    // Only show notifications for regular users, not admins
    if (this.authService.isLoggedIn() && !this.authService.isAdmin()) {
      this.userEmail = localStorage.getItem('userEmail') || '';
      if (this.userEmail) {
        this.loadPromotions();
      }
    }
  }

  loadPromotions(): void {
    this.loading = true;
    this.favoriteService.getPromotions(this.userEmail).subscribe({
      next: (data) => {
        this.promotions = data;
        this.loading = false;
        this.showNotifications = this.promotions.length > 0;
      },
      error: (err) => {
        console.error('Error loading promotions:', err);
        this.error = 'Nie udało się załadować promocji.';
        this.loading = false;
      }
    });
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }
}
