import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { PurchaseItem } from "./models/purchase-item";
import { Product } from "./models/models";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    private baseUrl = 'http://localhost:8080/api/products';
    private apiRoot = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.baseUrl}`).pipe(
            map(response => response),
            catchError(error => {
                console.error('Błąd pobierania produktów:', error);
                return throwError(() => error);  // Zwracamy błąd, a nie pustą tablicę
            })
        );
    }

  // Dodawanie produktu
  addProduct(product: PurchaseItem): Observable<PurchaseItem> {
    return this.http.post<PurchaseItem>(`${this.baseUrl}`, product);
  }

    addToShoppingList(product: Product, email: string): Observable<string> {
        const url = `${this.apiRoot}/api/shopping-list`;
        const params = new HttpParams().set('email', email);

        // Create a copy of the product to avoid modifying the original
        const productToSend = { ...product };

        // If product has a name field but no productName field, set productName to name
        if (productToSend.name && (!productToSend.productName || productToSend.productName === '')) {
            productToSend.productName = productToSend.name;
        }

        console.log('Sending product to backend:', productToSend);

        return this.http.post<string>(url, productToSend, {
            params,
            responseType: 'text' as 'json'
        }).pipe(
            catchError(err => {
                console.error('Błąd dodawania do listy zakupów:', err);
                return throwError(() => err);
            })
        );
    }


    findCheapestProducts(query: string, startDate?: string, endDate?: string, city?: string): Observable<Product[]> {
        let params = new HttpParams().set('query', query);

        // Dodanie innych parametrów, jeśli są dostępne
        if (startDate) params = params.set('startDate', startDate);
        if (endDate) params = params.set('endDate', endDate);
        if (city) params = params.set('city', city);

        return this.http.get<Product[]>(`${this.baseUrl}/cheapest`, { params }).pipe(
            map(response => response || []),
            catchError(error => {
                console.error('Błąd pobierania najtańszych produktów:', error);
                return throwError(() => error);  // Zwrócenie błędu do komponentu
            })
        );
    }


  // Wyszukiwanie produktów z możliwością dodania parametrów daty
  searchProduct(query: string, startDate?: string, endDate?: string): Observable<Product[]> {
    let params = new HttpParams();

    // Dodanie parametru zapytania (query)
    if (query) {
      params = params.set('name', query); // Changed to 'name' to match backend parameter
    }

    // Dodanie parametrów daty, jeśli są dostępne
    if (startDate) {
      params = params.set('startDate', startDate);
    }
    if (endDate) {
      params = params.set('endDate', endDate);
    }

    // Wysyłanie zapytania do backendu z parametrami
    return this.http.get<Product[]>(`${this.baseUrl}/search`, { params }).pipe(
        map(response => {
          console.log('Odpowiedź z backendu:', response); // Logowanie odpowiedzi
          return response || []; // Obsługuje przypadek, gdy response jest undefined
        }),
        catchError(error => {
          console.error('Błąd podczas wyszukiwania produktów:', error);
          return throwError(() => error); // Zwracamy błąd, a nie pustą tablicę
        })
    );
  }
}
