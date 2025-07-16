import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService, Producto } from '../../api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card'; // Para tarjetas
import { MatButtonModule } from '@angular/material/button'; // Para botones

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  productos: Producto[] = [];
  errorMessage: string | null = null;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {
    console.log('[DEBUG] ShopComponent - Constructor ejecutado');
  }

  ngOnInit() {
    console.log('[DEBUG] ShopComponent - ngOnInit ejecutado');
    this.apiService.getProductos().subscribe({
      next: (data) => {
        console.log('[DEBUG] ShopComponent - Datos recibidos del API');
        this.productos = data.map(p => ({
          ...p,
          imageUrl: `http://localhost:3000${p.imageUrl}`
        }));
        console.log('Productos asignados en ShopComponent:', this.productos);
        this.cdr.detectChanges(); // Forzar detección manual
      },
      error: (err) => {
        console.log('[DEBUG] ShopComponent - Error al cargar datos:', err.message);
        this.errorMessage = `Error al cargar productos: ${err.message}`;
        console.error('Error:', err);
        this.cdr.detectChanges();
      }
    });
  }

  onImgError(event: Event) {
    console.error('Error al cargar la imagen en ShopComponent:', (event.target as HTMLImageElement).src);
    (event.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
    (event.target as HTMLImageElement).onerror = null;
  }

  seleccionarProducto(producto: Producto) {
    console.log('[DEBUG] ShopComponent - Producto seleccionado:', producto);
  }
}
