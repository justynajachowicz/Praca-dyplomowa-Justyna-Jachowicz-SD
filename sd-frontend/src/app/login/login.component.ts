import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IntegrationService } from '../services/integration.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginRequest } from '../models/login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  

})
export class LoginComponent {
  username: string = '';
  password: string = '';

  // Jeden konstruktor, który wstrzykuje wszystkie wymagane zależności
  constructor(
    private http: HttpClient,
    private router: Router,
    private integration: IntegrationService
  ){}

  userForm : FormGroup = new FormGroup ({
    username: new FormControl(''),
    password: new FormControl('')
  });

  request: LoginRequest = new LoginRequest;

  doLogin() {
    const formValue = this.userForm.value;

    if(formValue.username == '' || formValue.password == '') {
      alert('wrong Credentilas');
      return;
    }
    this.request.username = formValue.username;
    this.request.password = formValue.password;

    this.integration.doLogin(this.request).subscribe({
      next:(res) => {
        console.log("Received Response:" +res.token);
      }, error: (err) => {
        console.log("Error Received Response:"+err);
      }

    });
  }


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
