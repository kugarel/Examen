import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdenService {
  private baseUrl = 'https://calidad.cominvi.com.mx:8880/api/principal'; 

  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<{ idusuario: number; nombre: string, paterno: string, materno: string }[]> {
    return this.http.get<{ idusuario: number; nombre: string, paterno: string, materno: string }[]>(`${this.baseUrl}/usuario`);
  }

  obtenerProductos(): Observable<{ idproducto: number; nombre: string, categoria: string }[]> {
    return this.http.get<{ idproducto: number; nombre: string, categoria: string }[]>(`${this.baseUrl}/producto`);
  }

  obtenerOrdenes(): Observable<{ idproducto: number; nombre: string, categoria: string }[]> {
    return this.http.get<{ idproducto: number; nombre: string, categoria: string }[]>(`${this.baseUrl}/orden`);
  }

  agregarOrden(orden: {
    usuario: { idusuario: number };
    producto: { idproducto: number };
    cantidad: number;
    preciounitario: number;
    fecha: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/orden`, orden, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
}
