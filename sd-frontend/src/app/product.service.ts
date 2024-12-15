import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Importujemy HttpClient
import { Observable } from 'rxjs';  // Importujemy Observable z RxJS
import { environment } from '../environments/environment'; // Importujemy plik environment.ts

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  // Metoda do pobierania produktów z backendu
  getProducts(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/products`); // Wykorzystanie apiUrl z environment.ts
  }
}

