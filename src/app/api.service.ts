// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Categoria {
  id: number;
  name: string;
}

export interface Producto {
  id: number;
  name: string;
  price: number;
  description: string;
  imageFilename: string | null;
  isAvailable: boolean;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string;
  categoria?: Categoria | { name: string }; // Aceptar { id, name } o solo { name }
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; // URL base del backend

  constructor(private http: HttpClient) {
    console.log('[DEBUG] ApiService - Constructor ejecutado');
  }

  getProductos(): Observable<Producto[]> {
    console.log('[DEBUG] ApiService - getProductos llamado, URL:', `${this.apiUrl}/products`); // Cambiar a /products
    return this.http.get<Producto[]>(`${this.apiUrl}/products`);
  }
}
