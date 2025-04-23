import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShoppingListItem } from '../models/shopping-list-item';  // Ścieżka do modelu
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService {
    private apiUrl = `${environment.apiUrl}/api/shopping-list`;

    constructor(private http: HttpClient) {}

    getShoppingList(userEmail: string): Observable<ShoppingListItem[]> {
        return this.http.get<ShoppingListItem[]>(`${this.apiUrl}?email=${userEmail}`);
    }

    removeItem(itemId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${itemId}`, { responseType: 'text' });
    }

    removeAllItems(userEmail: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/all?email=${userEmail}`, { responseType: 'text' });
    }
}
