import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';  // Import komponentu logowania

export const routes: Routes = [
  { path: '', component: LoginComponent },  // Domyślna trasa
  { path: 'login', component: LoginComponent }  // Trasa logowania
];
