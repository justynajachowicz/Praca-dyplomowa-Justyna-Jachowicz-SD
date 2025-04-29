import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavoriteService } from '../services/favorite.service';
import { FavoriteProduct } from '../models/favorite-product';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: FavoriteProduct[] = [];
  userEmail: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get user email from localStorage
    const email = localStorage.getItem('userEmail');
    if (email) {
      this.userEmail = email;
      this.loadFavorites();
    }
  }

  loadFavorites(): void {
    this.isLoading = true;
    console.log('Loading favorites for user:', this.userEmail);
    this.favoriteService.getFavorites(this.userEmail).subscribe({
      next: (favorites) => {
        console.log('Favorites loaded successfully:', favorites);
        this.favorites = favorites;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading favorites:', error);
        this.errorMessage = 'Nie udało się załadować ulubionych produktów.';
        this.isLoading = false;
      }
    });
  }

  removeFromFavorites(favoriteId: number | undefined): void {
    // Check if favoriteId is undefined
    if (favoriteId === undefined) {
      this.errorMessage = 'Nie można usunąć produktu: ID jest niezdefiniowane';

      // Clear error message after 3 seconds
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return;
    }

    this.favoriteService.removeFromFavorites(favoriteId).subscribe({
      next: () => {
        this.successMessage = 'Produkt został usunięty z ulubionych.';
        // Remove the product from the local list
        this.favorites = this.favorites.filter(fav => fav.id !== favoriteId);

        // Clear success message after 3 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error) => {
        console.error('Error removing from favorites:', error);
        this.errorMessage = 'Nie udało się usunąć produktu z ulubionych.';

        // Clear error message after 3 seconds
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    });
  }

  addToShoppingList(product: FavoriteProduct): void {
    // Navigate to product search with the product name
    this.router.navigate(['/product-search'], { 
      queryParams: { query: product.productName }
    });
  }
}
