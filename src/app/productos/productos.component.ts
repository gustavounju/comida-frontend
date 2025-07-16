import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService, Producto } from '../api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  errorMessage: string | null = null;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {
    console.log('[DEBUG] ProductosComponent - Constructor ejecutado');
  }

  ngOnInit() {
    console.log('[DEBUG] ProductosComponent - ngOnInit ejecutado');
    this.apiService.getProductos().subscribe({
      next: (data) => {
        console.log('[DEBUG] ProductosComponent - Datos recibidos del API');
        this.productos = data.map(p => ({
          ...p,
          imageUrl: `http://localhost:3000${p.imageUrl}`
        }));
        console.log('Productos asignados en ProductosComponent:', this.productos);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('[DEBUG] ProductosComponent - Error al cargar datos:', err.message);
        this.errorMessage = `Error al cargar productos: ${err.message}`;
        console.error('Error:', err);
        this.cdr.detectChanges();
      }
    });
  }

  // Método temporal para evitar el error de 'onImgError'
  onImgError(event: Event) {
    console.error('Error al cargar la imagen en ProductosComponent:', (event.target as HTMLImageElement).src);
    (event.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
    (event.target as HTMLImageElement).onerror = null;
  }

  // Método temporal para evitar el error de 'seleccionarProducto'
  seleccionarProducto(producto: Producto) {
    console.log('[DEBUG] ProductosComponent - Producto seleccionado:', producto);
    // Lógica vacía por ahora para evitar el error
  }
}
