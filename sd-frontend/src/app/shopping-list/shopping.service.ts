import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Shop, Product, ShoppingList, Purchase } from '../models/models';
import {ShoppingListItem} from "../models/shopping-list-item";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private apiUrl = 'http://localhost:8080/user/shopping'; // Podmień na właściwy URL

  constructor(private http: HttpClient) {}

  getShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>(`${this.apiUrl}/lists`).pipe(
      catchError(error => {
        console.error('Błąd podczas pobierania sklepów:', error);
        return of([]); // Zwrócenie pustej tablicy w przypadku błędu
      })
    );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`).pipe(
      catchError(error => {
        console.error('Błąd podczas pobierania produktów:', error);
        return of([]); // Zwrócenie pustej tablicy w przypadku błędu
      })
    );
  }

  getShoppingLists(): Observable<ShoppingList[]> {
    return this.http.get<ShoppingList[]>(`${this.apiUrl}/shoppingLists`).pipe(
      catchError(error => {
        console.error('Błąd podczas pobierania list zakupowych:', error);
        return of([]); // Zwrócenie pustej tablicy w przypadku błędu
      })
    );
  }

  addShoppingList(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/shoppingLists`, data).pipe(
      catchError(error => {
        console.error('Błąd podczas dodawania listy zakupowej:', error);
        return of(null); // Zwrócenie null w przypadku błędu
      })
    );
  }

  addPurchase(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/purchases`, data).pipe(
      catchError(error => {
        console.error('Błąd podczas dodawania zakupu:', error);
        return of(null);
      })
    );
  }

  deletePurchase(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/purchases/${id}`).pipe(
      catchError(error => {
        console.error('Błąd podczas usuwania zakupu:', error);
        return of(null);
      })
    );
  }
    getShoppingList(userEmail: string): Observable<ShoppingListItem[]> {
        return this.http.get<ShoppingListItem[]>(`${this.apiUrl}?email=${userEmail}`);
    }

  // Method to get store address by store name
  getStoreAddress(storeName: string): Observable<string> {
    // Since we don't have a direct API endpoint for this, we'll use a mock implementation
    // In a real application, you would call an API endpoint to get the store address
    return of(`ul. ${storeName} 123`); // Mock address: "ul. [StoreName] 123"
  }
}
