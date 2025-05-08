import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';
import { Shop, Product, ShoppingList, Purchase } from '../models/models';
import {ShoppingListItem} from "../models/shopping-list-item";
import { ProductDTO } from '../models/product-dto';

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

  // Method to get store address by store name and city
  getStoreAddress(storeName: string, city?: string): Observable<string> {
    // Build the URL with optional city parameter
    let url = `http://localhost:8080/api/stores/address?name=${encodeURIComponent(storeName)}`;
    if (city) {
      url += `&city=${encodeURIComponent(city)}`;
    }

    // Get real store address from the backend
    return this.http.get<any>(url).pipe(
      map(response => response.address),
      catchError(error => {
        console.error('Błąd podczas pobierania adresu sklepu:', error);
        // Fallback to mock address if real address is not available
        return of(`ul. ${storeName} 123`);
      })
    );
  }

  // Method to find the cheapest products by name
  findCheapestProducts(productName: string): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(`http://localhost:8080/api/products/cheapest?query=${encodeURIComponent(productName)}`).pipe(
      catchError(error => {
        console.error('Błąd podczas wyszukiwania najtańszych produktów:', error);
        return of([]);
      })
    );
  }

  // Method to find the cheapest products by name and city
  findCheapestProductsByCity(productName: string, city: string): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(`http://localhost:8080/api/products/cheapest?query=${encodeURIComponent(productName)}&city=${encodeURIComponent(city)}`).pipe(
      catchError(error => {
        console.error('Błąd podczas wyszukiwania najtańszych produktów w mieście:', error);
        return of([]);
      })
    );
  }

  // Method to get available stores in a city
  getStoresByCity(city: string): Observable<string[]> {
    return this.http.get<string[]>(`http://localhost:8080/api/products/stores?city=${encodeURIComponent(city)}`).pipe(
      catchError(error => {
        console.error('Błąd podczas pobierania sklepów w mieście:', error);
        return of([]);
      })
    );
  }

  // Method to get products by store and city
  getProductsByStoreAndCity(store: string, city: string): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(`http://localhost:8080/api/products/by-store?store=${encodeURIComponent(store)}&city=${encodeURIComponent(city)}`).pipe(
      catchError(error => {
        console.error('Błąd podczas pobierania produktów w sklepie i mieście:', error);
        return of([]);
      })
    );
  }
}
