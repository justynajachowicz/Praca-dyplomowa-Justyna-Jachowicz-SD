import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { PurchaseItem } from "./models/purchase-item";
import { Product } from "./models/models";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Pobieranie wszystkich produktów
  getProducts(): Observable<Product[]> {
    return this.http.get<{ _embedded: { products: Product[] } }>(`${this.apiUrl}/products`).pipe(
        map(response => response._embedded.products),
        catchError(error => {
          console.error('Błąd pobierania produktów:', error);
          return [];
        })
    );
  }

  // Dodawanie produktu
  addProduct(product: PurchaseItem): Observable<PurchaseItem> {
    return this.http.post<PurchaseItem>(`${this.apiUrl}/products`, product);
  }

    addToShoppingList(product: Product, email: string): Observable<any> {
        const params = new HttpParams().set('email', email);

        return this.http.post(`${this.apiUrl}/api/shopping-list`, product, {
            params,
            responseType: 'text' // <- DODAJ TO
        }).pipe(
            catchError(error => {
                console.error('Błąd dodawania produktu do listy zakupów:', error);
                throw error;
            })
        );
    }



  findCheapestProducts(query: string, startDate: string, endDate: string, city?: string) {
    let params = new HttpParams()
        .set('query', query);

    if (startDate) {
      params = params.set('startDate', startDate);
    }
    if (endDate) {
      params = params.set('endDate', endDate);
    }
    if (city) {
      params = params.set('city', city);
    }

    return this.http.get<Product[]>(`${this.apiUrl}/api/products/cheapest`, { params }).pipe(
        map(response => response || []),
        catchError(error => {
          console.error('Błąd pobierania najtańszych produktów:', error);
          return [];
        })
    );
  }


  // Wyszukiwanie produktów z możliwością dodania parametrów daty
  searchProduct(query: string, startDate?: string, endDate?: string): Observable<Product[]> {
    let params = new HttpParams();

    // Dodanie parametru zapytania (query)
    if (query) {
      params = params.set('query', query);
    }

    // Dodanie parametrów daty, jeśli są dostępne
    if (startDate) {
      params = params.set('startDate', startDate);
    }
    if (endDate) {
      params = params.set('endDate', endDate);
    }

    // Wysyłanie zapytania do backendu z parametrami
    return this.http.get<{ _embedded?: { products: Product[] } }>(`${this.apiUrl}/products/search`, { params }).pipe(
        map(response => {
          console.log('Odpowiedź z backendu:', response); // Logowanie odpowiedzi
          return response._embedded?.products || []; // Obsługuje przypadek, gdy _embedded lub products jest undefined
        }),
        catchError(error => {
          console.error('Błąd podczas wyszukiwania produktów:', error);
          return [];
        })
    );
  }
}
