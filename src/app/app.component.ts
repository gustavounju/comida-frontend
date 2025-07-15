import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importa RouterModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // Añade RouterModule a imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'comida-frontend';
}
