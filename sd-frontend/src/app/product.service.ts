import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Importujemy HttpClient
import { Observable } from 'rxjs';  // Importujemy Observable z RxJS
import { environment } from '../environments/environment';
import {PurchaseItem} from "./models/purchase-item"; // Importujemy plik environment.ts

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl: String | undefined;

  constructor(private http: HttpClient) { }

  // Metoda do pobierania produktów z backendu
  getProducts(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/products`); // Wykorzystanie apiUrl z environment.ts
  }

  addProduct(product: PurchaseItem): Observable<PurchaseItem> {
    return this.http.post<PurchaseItem>(<string>this.apiUrl, product);

    
  }
}

