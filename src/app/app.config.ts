import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app-routing.module';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Importar withFetch
import { importProvidersFrom } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(), // Detección manual sin Zone.js
    provideHttpClient(withFetch()), // Proveer HttpClient con soporte Fetch
    provideRouter(routes)
  ]
};
