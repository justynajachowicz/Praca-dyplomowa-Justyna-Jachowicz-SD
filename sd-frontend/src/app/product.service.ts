import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';
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
    return this.http.get<{ _embedded: { products: Product[] } }>(`${this.apiUrl}/products`)
        .pipe(map(response => response._embedded.products));
  }

  // Dodawanie produktu
  addProduct(product: PurchaseItem): Observable<PurchaseItem> {
    return this.http.post<PurchaseItem>(`${this.apiUrl}/products`, product);
  }
  findCheapestProducts(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8080/api/products/cheapest?query=${query}`);
  }

  searchProduct(query: string): Observable<Product[]> {
    return this.http.get<{ _embedded: { products: Product[] } }>(
        `${this.apiUrl}/products/search?query=${query}`
    ).pipe(
        map(response => {
          console.log('Odpowiedź z backendu:', response); // Logowanie odpowiedzi
          return response._embedded?.products || []; // Obsługuje przypadek, gdy _embedded lub products jest undefined
        })
    );
  }}




