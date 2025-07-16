import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirección estricta a /home
  { path: 'home', component: HomeComponent },           // Ruta para Home
  { path: 'shop', component: ShopComponent },          // Ruta para Shop
  { path: 'shop/:id', component: ShopComponent },      // Ruta dinámica (ajustar según ProductDetail)
  { path: '**', redirectTo: '/home' }                  // Redirección para rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {
    console.log('[DEBUG] AppRoutingModule - Configuración de rutas cargada. Rutas definidas:', routes);
    console.log('[DEBUG] AppRoutingModule - Ruta inicial antes de redirección:', this.router.url);
    // Forzar redirección a /home al iniciar, solo si no está en la ruta correcta
    if (this.router.url !== '/home') {
      console.log('[DEBUG] AppRoutingModule - Redirigiendo a /home');
      this.router.navigate(['/home'], { replaceUrl: true }); // Reemplazar la URL actual
    }
  }
}
