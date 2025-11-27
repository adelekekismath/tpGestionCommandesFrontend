import { Routes } from '@angular/router';
import { App } from './app';
import { AuthComponent } from './auth/auth.component';
import { ProductsComponent } from './products/products.component';
import { CategoryComponent } from './category/category.component';
import { authGuard, isAlreadyLoggedInGuard } from '../services/auth/auth.guard';
import { ClientComponent } from './client/client.component';
import { CommandeComponent } from './commande/commande.component';
import { LignecommandeComponent } from './lignecommande/lignecommande.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { homeAuthGuard } from '../services/auth/homeAuth.guard';
import { rootAuthGuard } from '../services/auth/rootAuth.guard';

export const routes: Routes = [
  {path: '', component: App, canActivate: [rootAuthGuard]},
  {path: 'auth', component: AuthComponent, canActivate: [isAlreadyLoggedInGuard]},
  {path: 'register', component: AuthComponent, canActivate: [isAlreadyLoggedInGuard]},
  {path: 'product', component: ProductsComponent, canActivate: [authGuard]},
  {path: 'category', component: CategoryComponent, canActivate: [authGuard]},
  {path: 'client', component: ClientComponent, canActivate: [authGuard]},
  {path: 'order', component: CommandeComponent, canActivate: [authGuard]},
  {path: 'order-line', component: LignecommandeComponent, canActivate: [authGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
  {path: 'home', component: HomeComponent, canActivate: [homeAuthGuard]},
];
