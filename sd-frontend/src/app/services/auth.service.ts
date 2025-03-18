import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; // Ścieżka do autoryzacji

  constructor(private http: HttpClient) {}
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<{ token: string, role: string }>(`${this.apiUrl}/login`, credentials).pipe(
        tap(response => {
          localStorage.setItem('jwt', response.token);  // Zapisz token
          localStorage.setItem('role', response.role);  // Zapisz rolę użytkownika

          // Tymczasowe logowanie do konsoli
          console.log('Token:', response.token);
          console.log('Role:', response.role);
// Potwierdzenie zapisania roli
          console.log('Role saved to localStorage:', response.role);  // Zobacz, co jest zapisane
        })
    );
  }
  register(registerRequest: { email: string, password: string, confirmPassword: string }): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.apiUrl}/register`, registerRequest, { observe: 'response' });
  }

  logout() {
    localStorage.removeItem('jwt');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt');
  }
  getUserRole(): string | null {
    const role = localStorage.getItem('role');
    console.log('User role:', role); // Dodaj logowanie
    return role;
  }
}