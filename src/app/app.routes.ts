import { Routes } from '@angular/router';
import { App } from './app';
import { AuthComponent } from './auth/auth.component';
import { ProductsComponent } from './products/products.component';
import { CategoryComponent } from './category/category.component';
import { authGuard, isAlreadyLoggedInGuard } from '../services/auth/auth.guard';
import { ClientComponent } from './client/client.component';
import { CommandeComponent } from './commande/commande.component';
import { LignecommandeComponent } from './lignecommande/lignecommande.component';

export const routes: Routes = [
  {path: '', component: App, canActivate: [authGuard]},
  {path: 'login', component: AuthComponent, canActivate: [isAlreadyLoggedInGuard]},
  {path: 'product', component: ProductsComponent, canActivate: [authGuard]},
  {path: 'category', component: CategoryComponent, canActivate: [authGuard]},
  {path: 'client', component: ClientComponent, canActivate: [authGuard]},
  {path: 'order', component: CommandeComponent, canActivate: [authGuard]},
  {path: 'order-line', component: LignecommandeComponent, canActivate: [authGuard]},

];
