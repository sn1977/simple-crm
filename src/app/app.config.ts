import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideNativeDateAdapter} from '@angular/material/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideNativeDateAdapter(), importProvidersFrom(provideFirebaseApp(() => initializeApp({
      "projectId":"simple-crm-e11ca",
      "appId":"1:214415715397:web:84ee88400a04feb8f9072c",
      "storageBucket":"simple-crm-e11ca.appspot.com",
      "apiKey":"AIzaSyAqwm-GtDj0ZcEPXAumiC6GeDmGLd7ZHHs",
      "authDomain":"simple-crm-e11ca.firebaseapp.com",
      "messagingSenderId":"214415715397"
  }))), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideStorage(() => getStorage()))]
};
