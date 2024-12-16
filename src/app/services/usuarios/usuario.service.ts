import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = 'https://calidad.cominvi.com.mx:8880/api/principal'; 

  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<{ idusuario: number; nombre: string, paterno: string, materno: string }[]> {
    return this.http.get<{ idusuario: number; nombre: string, paterno: string, materno: string }[]>(`${this.baseUrl}/usuario`);
  }

  obtenerUsuarioPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/usuario/${id}`);
  }

  agregarUsuario(usuario: {
    nombre: string;
    paterno: string;
    materno: string;
    correo: string;
    estatus: number;
    fecharegistro: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/usuario`, usuario, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  actualizarUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/usuario/${id}`, usuario, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
