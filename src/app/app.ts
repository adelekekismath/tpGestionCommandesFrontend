import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthService } from '../services/auth/auths.service';
import { ToastComponent } from './toast/toast.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, ToastComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App  {
  protected readonly title = signal('tpGestionCommandes');

  constructor(public authService: AuthService){}


}
