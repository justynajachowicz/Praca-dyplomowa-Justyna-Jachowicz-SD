import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PurchaseItem } from '../models/purchase-item';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseHistoryService {
  private apiUrl = `${environment.apiUrl}/api/purchase-history`;

  constructor(private http: HttpClient) {}

  getPurchaseHistory(userEmail: string): Observable<PurchaseItem[]> {
    return this.http.get<PurchaseItem[]>(`${this.apiUrl}?email=${userEmail}`);
  }
}