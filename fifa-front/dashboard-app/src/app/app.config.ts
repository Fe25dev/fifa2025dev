import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter,Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

import { UsersComponent } from './users/users.component'; // Asegúrate de que la ruta sea correcta
import { DashboardComponent } from './dashboard/dashboard.component'; // Asegúrate de que la ruta sea correcta
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { CreatePlayerComponent } from './create-player/create-player.component';
import { UpdatePlayComponent } from './update-play/update-play.component';

import { ApiService } from './services/api.service'; 
import { AuthService } from './services/auth.service';
import {CommonModule} from '@angular/common';

import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
  ApiService,
  AuthService,
  provideRouter([
      { path: 'updatePlayer', component: UpdatePlayComponent },
      { path: 'createPlayer', component: CreatePlayerComponent },
      { path: 'users', component: UsersComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }, 
      { path: '**', redirectTo: 'login' }  
    ]),
  provideHttpClient(),
  provideCharts(withDefaultRegisterables()),
  NavbarComponent]
};
