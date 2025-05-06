import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { PurchaseHistory } from '../models/purchase-history.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseHistoryService {
  private apiUrl = 'http://localhost:8080/api/purchase-history';

  constructor(private http: HttpClient) { }

  /**
   * Get all purchase history for a user
   * @param email The user's email
   * @returns Observable of purchase history items
   */
  getPurchaseHistory(email: string): Observable<PurchaseHistory[]> {
    console.log('PurchaseHistoryService - getPurchaseHistory - email:', email);
    const params = new HttpParams().set('email', email);
    console.log('PurchaseHistoryService - getPurchaseHistory - API URL:', this.apiUrl);
    console.log('PurchaseHistoryService - getPurchaseHistory - params:', params.toString());

    return this.http.get<PurchaseHistory[]>(this.apiUrl, { params }).pipe(
      tap(
        data => console.log('PurchaseHistoryService - getPurchaseHistory - response data:', data),
        error => console.error('PurchaseHistoryService - getPurchaseHistory - error:', error)
      )
    );
  }

  /**
   * Get purchase history for a user within a date range
   * @param email The user's email
   * @param startDate The start date of the range
   * @param endDate The end date of the range
   * @returns Observable of purchase history items
   */
  getPurchaseHistoryByDateRange(email: string, startDate: Date, endDate: Date): Observable<PurchaseHistory[]> {
    const params = new HttpParams()
      .set('email', email)
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());
    return this.http.get<PurchaseHistory[]>(`${this.apiUrl}/date-range`, { params });
  }

  /**
   * Get purchase history for a user and store
   * @param email The user's email
   * @param store The store to filter by
   * @returns Observable of purchase history items
   */
  getPurchaseHistoryByStore(email: string, store: string): Observable<PurchaseHistory[]> {
    const params = new HttpParams()
      .set('email', email)
      .set('store', store);
    return this.http.get<PurchaseHistory[]>(`${this.apiUrl}/store`, { params });
  }

  /**
   * Search purchase history by product name
   * @param email The user's email
   * @param productName The product name to search for
   * @returns Observable of purchase history items
   */
  searchPurchaseHistory(email: string, productName: string): Observable<PurchaseHistory[]> {
    const params = new HttpParams()
      .set('email', email)
      .set('productName', productName);
    return this.http.get<PurchaseHistory[]>(`${this.apiUrl}/search`, { params });
  }

  /**
   * Delete a purchase history record
   * @param id The ID of the purchase history to delete
   * @returns Observable of success message
   */
  deletePurchaseHistory(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }

  /**
   * Complete a purchase by moving items from shopping list to purchase history
   * @param email The user's email
   * @returns Observable of success message
   */
  completePurchase(email: string): Observable<string> {
    const params = new HttpParams().set('email', email);
    return this.http.post<string>(`${this.apiUrl}/complete`, null, { params });
  }
}
