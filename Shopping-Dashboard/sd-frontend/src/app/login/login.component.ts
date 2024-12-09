import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    const loginData = { username: this.username, password: this.password };
    this.http.post('/login', loginData, { withCredentials: true }).subscribe({
      next: () => {
        window.location.href = '/dashboard'; // Przekierowanie po zalogowaniu
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }
}
