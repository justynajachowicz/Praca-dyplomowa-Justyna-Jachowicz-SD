import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShoppingListItem } from '../models/shopping-list-item';  // Ścieżka do modelu

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService {
    private apiUrl = 'https://api.example.com/shopping-list';

    constructor(private http: HttpClient) {}

    getShoppingList(userEmail: string): Observable<ShoppingListItem[]> {
        return this.http.get<ShoppingListItem[]>(`${this.apiUrl}?email=${userEmail}`);
    }
}