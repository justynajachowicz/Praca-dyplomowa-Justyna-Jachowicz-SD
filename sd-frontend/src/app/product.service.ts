import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Importujemy HttpClient
import { Observable } from 'rxjs';  // Importujemy Observable z RxJS
import { environment } from '../environments/environment';
import { PurchaseItem } from "./models/purchase-item"; // Importujemy plik environment.ts

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl;  // Pobieramy apiUrl z environment.ts

  constructor(private http: HttpClient) { }

  // Metoda do pobierania produktów z backendu
  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`); // Wykorzystanie apiUrl z environment.ts
  }

  // Poprawiona metoda do dodawania produktu
  addProduct(product: PurchaseItem): Observable<PurchaseItem> {
    return this.http.post<PurchaseItem>(`${this.apiUrl}/products`, product); // Dodajemy `/products` do apiUrl
  }
  // Nowa metoda do wyszukiwania produktów
  searchProduct(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/search?query=${query}`); // Wysyłamy zapytanie z parametrem query
  }
}