import { Injectable } from '@angular/core';
import { HttpClient, HttpParams ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'; 
import { of } from 'rxjs';  // Importar of para manejar el error
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Injectable({ providedIn: 'root' })

export class ApiService {
  private apiUrl = 'http://localhost:3000/api/players/find'; 
  private apiUrl2 = 'http://localhost:3000/api/players'; 
  private apiUrl3 = 'http://localhost:3000/api/players/update';

  constructor(private http: HttpClient) { }
    getPlayer(playerId: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/${playerId}`).pipe(
          catchError(error => {
            console.error('Error en la solicitud HTTP:', error);
            return of([]);  // Retorna un array vacío en caso de error
          })
        );
      }
    getPlayersPage(filters: any): Observable<any> {
      // Aquí se añaden los parámetros de consulta, con valores predeterminados si no se pasan
      const params = new HttpParams()
        .set('page', filters.page.toString() || '')          // Página actual
        .set('limit', filters.pageSize.toString() || '')     // Cantidad de jugadores por página
        .set('name', filters.name || '')               // Filtro por nombre del jugador
        .set('club', filters.club || '')               // Filtro por nombre del club
        .set('nacion', filters.nacion || '')  // Filtro por país
        .set('format', filters.format || '');          // Formato de descarga (csv, xlsx)
     // return this.http.get<any[]>(`${this.apiUrl}/${playerId}`).pipe(
     
      return this.http.get<any>(this.apiUrl2, { params }).pipe(
      catchError(error => {
          console.error('Error en la solicitud HTTP:', error);
          return of([]);  // Retorna un array vacío en caso de error
        })
      );
    }

    updatePlayerById(playerId: string, playerData: any): Observable<any> {
        const url = `${this.apiUrl3}/${playerId}`;
        return this.http.put<any>(url, playerData).pipe(
          catchError(error => {
            console.error('Error en la solicitud HTTP:', error);
            return of(null);  
          })
        );
     }
    createPlayer(playerData: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, playerData, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        });
        }
}

