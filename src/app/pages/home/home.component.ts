import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ApiService, Producto, Categoria } from '../../api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCheckboxModule, MatCardModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  productos: Producto[] = [];
  filteredProductos: Producto[] = [];
  errorMessage: string | null = null;
  currentTime: string = new Date().toISOString();
  categories: string[] = []; // Lista de categorías únicas
  selectedCategories: string[] = []; // Lista de categorías seleccionadas

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {
    console.log('[DEBUG] HomeComponent - Constructor ejecutado');
  }

  ngOnInit() {
    console.log('[DEBUG] HomeComponent - ngOnInit ejecutado');
    this.apiService.getProductos().subscribe({
      next: (data) => {
        console.log('[DEBUG] HomeComponent - Datos recibidos del API:', data);
        this.productos = data.map(p => ({
          ...p,
          imageUrl: `http://localhost:3000${p.imageUrl}`,
          name: p.name || 'Sin nombre', // Asegurar que name no sea undefined
          price: p.price || 0, // Asegurar que price no sea undefined
          categoria: this.normalizeCategoria(p.categoria) // Normalizar categoria
        }));
        this.filteredProductos = [...this.productos]; // Inicializar con todos los productos
        this.extractCategories(); // Extraer categorías únicas
        console.log('Productos asignados en HomeComponent con categorías:', this.productos);
        this.cdr.detectChanges(); // Forzar detección manual
      },
      error: (err) => {
        console.log('[DEBUG] HomeComponent - Error al cargar datos:', err.message);
        this.errorMessage = `Error al cargar productos: ${err.message}`;
        console.error('Error:', err);
        this.cdr.detectChanges();
      }
    });
  }

  ngAfterViewInit() {
    console.log('[DEBUG] HomeComponent - ngAfterViewInit ejecutado');
  }

  onImgError(event: Event) {
    console.error('Error al cargar la imagen:', (event.target as HTMLImageElement).src);
    (event.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
    (event.target as HTMLImageElement).onerror = null;
  }

  // Normalizar categoria para que siempre tenga id y name
  private normalizeCategoria(categoria: Categoria | { name: string } | undefined): Categoria | undefined {
    if (!categoria) return undefined;
    if ('id' in categoria) return categoria as Categoria;
    return { id: 0, name: categoria.name }; // Asignar id temporal si solo hay name
  }

  // Extraer categorías únicas de los productos
  extractCategories() {
    const uniqueCategories = new Set<string>();
    this.productos.forEach(producto => {
      if (producto.categoria?.name) {
        uniqueCategories.add(producto.categoria.name);
      } else {
        console.warn('Producto sin categoría asignada:', producto);
      }
    });
    this.categories = Array.from(uniqueCategories);
  }

  // Filtrar productos por categorías seleccionadas
  filterByCategories(event: MatCheckboxChange) {
    const category = event.source.value;

    if (event.checked) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    }

    if (this.selectedCategories.length > 0) {
      this.filteredProductos = this.productos.filter(producto =>
        this.selectedCategories.includes(producto.categoria?.name || '')
      );
    } else {
      this.filteredProductos = [...this.productos]; // Mostrar todos si no hay categorías seleccionadas
    }
    this.cdr.detectChanges(); // Forzar actualización manual
  }
}
