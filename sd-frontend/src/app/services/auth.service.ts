import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth/login'; // URL do endpointa logowania
  private logoutUrl = 'http://localhost:8080/api/auth/logout'; // Endpoint wylogowania


  constructor(private http: HttpClient) {}

  login(credentials:LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, credentials ).pipe(
      tap(response => {
        localStorage.setItem ('token', response.token);
        console.log ('Login success, token saved:', response.token);
      }

      ),
      catchError(error =>  {
        console.error ('Login failed', error);
        throw error;

      })

      );
      
    
  }
  
  saveToken(token:string): void{
    localStorage.setItem('jwt', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  isAuthenticated(): boolean {
    return !! this.getToken();
  }

  logout(): void {
    this.http.post(this.logoutUrl, {}, { withCredentials: true }).subscribe({
      next: () => {
        console.log('Logout successful');
        localStorage.removeItem('jwt'); // Usunięcie tokena
        console.log('User logged out');
        window.location.href = '/login'; // Przekierowanie do ekranu logowania
      },
      error: (err) => {
        console.error('Logout failed', err);
      }
    });
    localStorage.removeItem('jwt');
  }
}
