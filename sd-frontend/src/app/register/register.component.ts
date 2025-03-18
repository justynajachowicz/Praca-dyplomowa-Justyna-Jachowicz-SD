import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';  // import AuthService
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    standalone: false
})
export class RegisterComponent {
  message: string = '';  // Zmienna do przechowywania komunikatów
  email: string = '';  // Zmieniono 'username' na 'email'
  password: string = '';
  confirmPassword: string = '';
  passwordMismatch: string = '';  // Zmienna do przechowywania komunikatów o błędzie przy niezgodnych hasłach
  loading: boolean = false;  // Zmienna do obsługi stanu ładowania (np. animacja podczas oczekiwania na odpowiedź)

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // Sprawdzenie, czy hasła są zgodne
    if (this.password !== this.confirmPassword) {
      this.passwordMismatch = 'Hasła się różnią. Proszę sprawdzić!';
      return;  // Zatrzymujemy dalszą rejestrację
    }

    // Czyszczenie komunikatu o błędzie przed próbą rejestracji
    this.passwordMismatch = '';
    this.loading = true; // Rozpoczynamy stan ładowania

    // Tworzenie obiektu rejestracyjnego
    const registerRequest = {
      email: this.email,  // użycie 'email' zamiast 'username'
      password: this.password,
      confirmPassword: this.confirmPassword  // Dodanie 'confirmPassword' tutaj
    };

    // Wywołanie metody rejestracji z serwisu
    this.authService.register(registerRequest).subscribe({
      next: (response: HttpResponse<any>) => {  // Typowanie odpowiedzi
        alert('Rejestracja udana');
        this.router.navigate(['/login']);
      },
      error: (error: any) => {  // Typowanie błędów
        this.loading = false; // Kończymy stan ładowania

        // Sprawdzamy, czy odpowiedź z serwera zawiera bardziej szczegółowy błąd
        if (error.error && error.error.message) {
          this.passwordMismatch = 'Błąd rejestracji: ' + error.error.message;
        } else if (error.status === 400 && error.error) {
          // Dodatkowa obsługa dla błędów statusu 400, np. jeśli backend zwróci JSON z komunikatem
          this.passwordMismatch = 'Błąd rejestracji: ' + (error.error.message || 'Nieprawidłowe dane');
        } else {
          this.passwordMismatch = 'Błąd rejestracji: ' + (error.message || 'Nieznany błąd');
        }
      },
      complete: () => {
        this.loading = false; // Kończymy stan ładowania
      }
    });

  }
  

  onLogin() {
    this.router.navigate(['/login']);
  }

  onRegister() {
    this.router.navigate(['/login']); // Przekierowanie do logowania
  }
}