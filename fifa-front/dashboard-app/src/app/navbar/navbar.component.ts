import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  constructor(
    private authService: AuthService, 
    private router: Router) {}
  
  navigateTo(route: string,event: Event): void {
    event.preventDefault(); // Evita que el enlace recargue la página
    this.router.navigate([route]); 
  }
  logout(): void {
    this.authService.logout();  
    this.router.navigate(['login']);  // Redirigimos al usuario a la página de login
  }
}