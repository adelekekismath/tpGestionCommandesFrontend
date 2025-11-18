import { Routes } from '@angular/router';
import { App } from './app';
import { AuthComponent } from './auth/auth.component';
import { ProductsComponent } from './products/products.component';
import { CategoryComponent } from './category/category.component';
import { authGuard } from '../services/auth.guard';

export const routes: Routes = [
  {path: '', component: App},
  {path: 'login', component: AuthComponent},
  {path: 'product', component: ProductsComponent},
  {path: 'category', component: CategoryComponent},
];
