import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Do obsługi ngModel (formularzy)
import { AppComponent } from './app.component';  // Główny komponent
import { LoginComponent } from './login/login.component'; // Komponent logowania

@NgModule({
  declarations: [
    AppComponent,  // Deklarowanie głównego komponentu
    LoginComponent  // Dodanie komponentu logowania
  ],
  imports: [
    BrowserModule,  // Importowanie modułów Angulara (np. BrowserModule)
    FormsModule     // Importowanie modułu formularzy, aby używać ngModel
  ],
  providers: [],
  bootstrap: [AppComponent],  // Komponent, który zostanie uruchomiony na początku
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Dodajemy do schemas, jeśli chcesz używać Web Components
})
export class AppModule { }
