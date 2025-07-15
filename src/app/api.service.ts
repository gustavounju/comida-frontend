import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs';

export interface Producto { // Restaurado tu modelo original
  id: number;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  imageFilename: string | null;
  imageUrl: string | null;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; // Base URL

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> { // Mantengo getProductos para tu estructura
    return this.http.get<Producto[]>(`${this.apiUrl}/products`, { withCredentials: false }).pipe( // Ajustado a /products
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching productos:', error);
        return throwError(() => new Error(`Error al obtener productos: ${error.status} ${error.statusText}`));
      })
    );
  }
}
