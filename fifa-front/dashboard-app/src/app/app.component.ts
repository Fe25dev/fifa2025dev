import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';

import { routes } from './app.routes'; 
import { provideRouter,Routes } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';

import { ChartOptions, ChartType, ChartDataset } from 'chart.js';  
import { ChartData, ChartConfiguration } from 'chart.js'; 

import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule,CommonModule,NavbarComponent,LoginComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'Page-principal';
  isAuthenticated: boolean = false; 
  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    // Verificamos el estado de autenticación al iniciar
    this.authService.getAuthenticationStatus().subscribe(authenticated => {
      this.isAuthenticated = authenticated;
      
      // Si el usuario está autenticado, redirigir automáticamente al dashboard
      if (this.isAuthenticated) {
        this.router.navigate(['/dashboard']);
      }
    });
  }
  
  logout(): void {
    this.authService.logout();  // Llamamos al servicio de logout
    this.isAuthenticated = false;  // Cambiamos el estado de autenticación a falso
    window.location.reload();
    this.router.navigate(['login']);  // Redirigimos al usuario a la página de login
   // window.location.reload();  // Recarga la página  no deveria ser nesesaria esta linea angular deberia hacerlo automaicamente corregir
  }
}