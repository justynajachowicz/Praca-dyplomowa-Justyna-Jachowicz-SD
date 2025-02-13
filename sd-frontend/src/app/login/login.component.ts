import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  doLogin() {
    if (this.userForm.invalid) return;

    const loginData = this.userForm.value;
    
    this.authService.login(loginData).subscribe({
      next: (response) => {
        localStorage.setItem('jwt', response.token); // Zapisujemy token
        this.router.navigate(['/dashboard']); // Przekierowanie do panelu
      },
      error: () => {
        this.errorMessage = 'Niepoprawny email lub hasło!';
      }
    });
  }

  onRegister() {
    this.router.navigate(['/register']); // Przekierowanie do rejestracji
  }
}
