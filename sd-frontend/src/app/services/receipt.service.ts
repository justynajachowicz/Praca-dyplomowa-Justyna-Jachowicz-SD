import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ReceiptService {
    private apiUrl = 'http://localhost:8080/api/receipts/upload';

    constructor(private http: HttpClient) {}

    uploadReceipt(file: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);

        const token = localStorage.getItem('auth_token');

        console.log('🔹 Token JWT:', token);
        console.log('🔹 Plik do wysłania:', file.name);
        console.log('🔹 Adres API:', this.apiUrl);

        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });

        return this.http.post(this.apiUrl, formData, { headers, observe: 'response' }).pipe(
            tap((response) => console.log('✅ Odpowiedź z backendu:', response)),
            catchError((error) => {
                console.error('❌ Błąd podczas wysyłania:', error);
                console.error('❌ Treść odpowiedzi:', error.error);
                return throwError(() => error);
            })
        );
    }
}