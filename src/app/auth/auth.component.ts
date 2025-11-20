import { Component } from '@angular/core';
import { AuthService, LoginRequest } from '../../services/auth/auths.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService:AuthService, private router: Router){}

  login(){
    const req: LoginRequest= {
      username: this.username,
      password: this.password
    };

    this.authService.login(req).subscribe({
      next:() => this.router.navigate(['product']),
      error: err=> this.errorMessage = 'Invalid username or password'
    });
  }
}
