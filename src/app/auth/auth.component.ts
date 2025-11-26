import { Component, signal } from '@angular/core';
import { AuthService, LoginRequest } from '../../services/auth/auths.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { extractErrorMessages } from '../../helper/extractErrorMessages';


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
  email = '';
  errorMessage = '';

  isRegisterMode = signal(false);

  constructor(private authService:AuthService, private router: Router, private toastService: ToastService){}

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

  register() {
    this.errorMessage = '';
    this.authService.register({
      username: this.username,
      password: this.password,
      email: this.email
    }).subscribe({
      next: () => {
        this.isRegisterMode.set(false);
        this.toastService.showSuccess('Enregistrement réussi, Vous pouvez maintenant vous connecter.');
        this.resetForm();
      },
      error: err => this.toastService.showError(extractErrorMessages(err))
      });
  }

  resetForm() {
    this.username = '';
    this.password = '';
    this.email = '';
  }
}
