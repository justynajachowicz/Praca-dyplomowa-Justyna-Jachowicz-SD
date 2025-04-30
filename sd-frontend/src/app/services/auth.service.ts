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
          // Clear any existing data
          localStorage.removeItem('jwt');
          localStorage.removeItem('role');

          // Save new data
          localStorage.setItem('jwt', response.token);  // Zapisz token
          localStorage.setItem('role', response.role);  // Zapisz rolę użytkownika

          // Enhanced logging
          console.log('Login successful');
          console.log('Token:', response.token);
          console.log('Role from server:', response.role);
          console.log('Role saved to localStorage:', localStorage.getItem('role'));

          // Check if role is admin
          const isAdmin = response.role && response.role.toUpperCase() === 'ADMIN';
          console.log('Is admin user:', isAdmin);
        })
    );
  }
  register(registerRequest: { email: string, password: string, confirmPassword: string }): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.apiUrl}/register`, registerRequest, { observe: 'response' });
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    localStorage.removeItem('userEmail');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt');
  }
  getUserRole(): string | null {
    const role = localStorage.getItem('role');
    console.log('User role:', role); // Dodaj logowanie
    return role;
  }

  isAdmin(): boolean {
    const role = this.getUserRole();
    const userEmail = localStorage.getItem('userEmail');
    const isAdminByRole = role !== null && role.toUpperCase() === 'ADMIN';
    const isAdminByEmail = userEmail === 'admin@gmail.com';
    const isAdminUser = isAdminByRole || isAdminByEmail;
    console.log('isAdmin check - Role:', role, 'Email:', userEmail, 'Is Admin:', isAdminUser);
    return isAdminUser;
  }
    isUserRegistered(email: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.apiUrl}/is-registered?email=${email}`);
    }

    validateCredentials(email: string, password: string): Observable<boolean> {
        return this.http.post<boolean>(`${this.apiUrl}/validate-credentials`, { email, password });
    }
}
