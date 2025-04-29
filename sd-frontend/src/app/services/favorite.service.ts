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

    return this.http.get<any[]>(this.apiUrl, { params }).pipe(
      map(favorites => {
        // Map backend response to frontend model
        return favorites.map(favorite => ({
          id: favorite.id,
          productId: favorite.productId,
          productName: favorite.productName,
          userEmail: userEmail, // Add userEmail field
          price: favorite.price,
          notifyOnPromotion: favorite.notifyOnPromotion,
          dateAdded: favorite.dateAdded, // Convert to string if needed
          imageUrl: favorite.imageUrl
        }));
      }),
      catchError(error => {
        console.error('Error fetching favorites:', error);
        return of([]);
      })
    );
  }

  // Add a product to favorites
  addToFavorites(product: Product, userEmail: string, notifyOnPromotion: boolean = true): Observable<any> {
    // Convert frontend Product to backend Product format
    const backendProduct = {
      id: product.productId,
      productName: product.name || product.productName,
      price: product.price,
      store: product.store || '',
      imageUrl: product.imageUrl || product.image || '',
      city: product.city || ''
    };

    // Add query parameters for email and notifyOnPromotion
    const params = new HttpParams()
      .set('email', userEmail)
      .set('notifyOnPromotion', notifyOnPromotion.toString());

    return this.http.post(this.apiUrl, backendProduct, { params, responseType: 'text' }).pipe(
      catchError(error => {
        console.error('Error adding to favorites:', error);
        return of('Error adding to favorites');
      })
    );
  }

  // Remove a product from favorites
  removeFromFavorites(favoriteId: number | undefined): Observable<any> {
    // If favoriteId is undefined, return an error observable
    if (favoriteId === undefined) {
      console.error('Cannot remove favorite: ID is undefined');
      return of('Error: Favorite ID is undefined');
    }

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
