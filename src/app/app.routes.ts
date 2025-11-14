import { Routes } from '@angular/router';
import { App } from './app';
import { AuthComponent } from './auth/auth.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
  {path: '', component: App},
  {path: '/login', component: AuthComponent},
  {path: '/product', component: ProductsComponent}
];
