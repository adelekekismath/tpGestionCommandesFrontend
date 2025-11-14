import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsComponent } from './products/products.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tpGestionCommandes');
}
