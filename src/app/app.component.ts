import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HomeComponent, ShopComponent, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'comida-frontend';

  constructor(private cdr: ChangeDetectorRef) {
    console.log('[DEBUG] AppComponent - Constructor ejecutado');
  }

  ngOnInit() {
    console.log('[DEBUG] AppComponent - ngOnInit ejecutado');
    // Forzar detección de cambios manualmente si es necesario
    this.cdr.detectChanges();
  }
}
