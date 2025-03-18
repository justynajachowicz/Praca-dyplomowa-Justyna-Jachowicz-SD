import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ReceiptService {
    private apiUrl = 'http://localhost:8080/api/receipts/upload';  // URL backendu

    constructor(private http: HttpClient) {}

    uploadReceipt(file: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);

        // Token JWT, jeśli jest w localStorage
        const token = localStorage.getItem('auth_token');

        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });

        return this.http.post(this.apiUrl, formData, { headers });
    }
}
