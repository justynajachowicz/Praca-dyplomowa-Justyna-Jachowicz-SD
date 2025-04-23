import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FavoriteProduct } from '../models/favorite-product';
import { Product } from '../models/models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = `${environment.apiUrl}/api/favorites`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // Get all favorite products for a user
  getFavorites(userEmail: string): Observable<FavoriteProduct[]> {
    const params = new HttpParams().set('email', userEmail);

    return this.http.get<FavoriteProduct[]>(this.apiUrl, { params }).pipe(
      catchError(error => {
        console.error('Error fetching favorites:', error);
        return of([]);
      })
    );
  }

  // Add a product to favorites
  addToFavorites(product: Product, userEmail: string, notifyOnPromotion: boolean = true): Observable<any> {
    const favoriteProduct: FavoriteProduct = {
      productId: product.productId,
      productName: product.name || product.productName,
      userEmail: userEmail,
      price: product.price,
      notifyOnPromotion: notifyOnPromotion,
      dateAdded: new Date().toISOString()
    };

    return this.http.post(this.apiUrl, favoriteProduct, { responseType: 'text' }).pipe(
      catchError(error => {
        console.error('Error adding to favorites:', error);
        return of('Error adding to favorites');
      })
    );
  }

  // Remove a product from favorites
  removeFromFavorites(favoriteId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${favoriteId}`, { responseType: 'text' }).pipe(
      catchError(error => {
        console.error('Error removing from favorites:', error);
        return of('Error removing from favorites');
      })
    );
  }

  // Get promotions for favorite products
  getPromotions(userEmail: string): Observable<Product[]> {
    const params = new HttpParams().set('email', userEmail);

    return this.http.get<Product[]>(`${this.apiUrl}/promotions`, { params }).pipe(
      catchError(error => {
        console.error('Error fetching promotions:', error);
        return of([]);
      })
    );
  }

  // Check if current user is authenticated and not an admin
  canAccessFavorites(): boolean {
    return this.authService.isLoggedIn() && !this.authService.isAdmin();
  }
}
