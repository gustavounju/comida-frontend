import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService, Producto } from '../api.service'; // Mantengo Producto
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = []; // Mantengo productos y Producto
  errorMessage: string | null = null;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.apiService.getProductos().subscribe({
      next: (data) => {
        this.productos = data.map(p => ({
          ...p,
          imageUrl: `http://localhost:3000${p.imageUrl}` // Usa imageUrl de tu modelo
        }));
        console.log('Productos asignados con imágenes:', this.productos.map(p => ({ ...p, imageUrl: p.imageUrl })));
        this.cdr.detectChanges(); // Asegura la renderización
      },
      error: (err) => {
        this.errorMessage = `Error al cargar productos: ${err.message}`;
        console.error('Error:', err);
        this.cdr.detectChanges(); // Asegura la renderización en caso de error
      }
    });
  }

  seleccionarProducto(producto: Producto) {
    console.log('Producto seleccionado:', producto.name);
  }

  onImgError(event: Event) {
    console.error('Error al cargar la imagen:', (event.target as HTMLImageElement).src);
    (event.target as HTMLImageElement).src = 'https://via.placeholder.com/100'; // Imagen por defecto
    (event.target as HTMLImageElement).onerror = null; // Evita bucles infinitos
  }
}
