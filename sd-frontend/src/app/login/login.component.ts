import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IntegrationService } from '../services/integration.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Zainicjowane wartości w formularzu
  userForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  request: LoginRequest = { email: '', password: '' };

  constructor(
    private router: Router,
    private integration: IntegrationService
  ) {}

  // Funkcja logowania
  doLogin() {
    const formValue = this.userForm.value;
    
    // Przypisanie danych z formularza do obiektu request
    this.request.email = formValue.email;
    this.request.password = formValue.password;

    // Sprawdzenie czy formularz jest poprawnie wypełniony
    if (this.userForm.invalid) {
      alert('Proszę wypełnić wszystkie pola.');
      return;
    }

    // Wywołanie integracji logowania
    this.integration.doLogin(this.request).subscribe({
      next: (res: LoginResponse) => {
        console.log("Received Response:", res.token);
        localStorage.setItem('jwt', res.token);
        if (res.user) {
          localStorage.setItem('userEmail', res.user.email);
          localStorage.setItem('userRole', res.user.role);
        }
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log("Error Received Response:", err);
      }
    });
  }

  // Funkcja rejestracji
  onRegister() {
    this.router.navigate(['/register']);
  }
}