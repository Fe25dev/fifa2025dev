import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl4 = 'http://localhost:3000/user/users/login';
  private authenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated()); // Estado inicial

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(this.apiUrl4, body);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getAuthenticationStatus(): Observable<boolean> {
    return this.authenticatedSubject.asObservable();
  }

  loginSuccess(token: string): void {
    // Almacena el token en el localStorage y actualiza el estado de autenticación
    localStorage.setItem('token', token);
    this.authenticatedSubject.next(true); // Cambia el estado a autenticado
  }
  logout(): void {
    // Elimina el token y actualiza el estado de autenticación
    localStorage.removeItem('token');
    this.authenticatedSubject.next(false);
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}