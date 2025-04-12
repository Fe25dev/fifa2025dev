import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onSubmit() {

  if (this.loginForm.valid) {
    const { email, password } = this.loginForm.value;
    // Verificar que el email y el password no sean nulos o indefinidos
    if (email && password) {
      this.authService.login(email, password).subscribe(
        (response) => {
          console.log('Login exitoso', response);
          localStorage.setItem('token', response.token); 
          window.location.reload();//
          this.router.navigate(['dashboard']); 
        },
        (error) => {
          console.error('Error al iniciar sesión', error);
          alert('Credenciales incorrectas o error en el servidor');
        }
      );
    } else {
      console.error('Email o contraseña no proporcionados');
      alert('Por favor, ingrese un email y una contraseña válidos');
    }
  } else {
    console.error('Formulario inválido');
    alert('Por favor, complete todos los campos correctamente');
  }
}
}