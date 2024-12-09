import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  

})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}


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

  onRegister(){
    this.router.navigate(['/register']); // Przekierowanie na stronę rejestracji
  }
}
