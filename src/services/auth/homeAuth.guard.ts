import { inject } from '@angular/core';
import { AuthService } from './auths.service';
import { Router } from '@angular/router';

export function homeAuthGuard() {
  const authservice = inject(AuthService);
  const router = inject(Router);

  var logged =  authservice.isLoggedIn();
  if(logged){
    router.navigate(['/dashboard']);
    return true;
  }
  else{
    router.navigate(['/home']);
    return false;
  }
}
