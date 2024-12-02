import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';  // Upewnij się, że masz poprawnie zdefiniowane trasy

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),  // Ustawienia detekcji zmian
    provideRouter(routes)  // Inicjalizacja routera
  ]
};
