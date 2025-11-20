import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { AuthService } from "./auths.service";
import { Router } from "@angular/router";


export const authGuard: CanActivateFn =  ()=>{
  const authservice = inject(AuthService);
  const router = inject(Router);

  var logged =  authservice.isLoggedIn();
  if(logged){
    return true;
  }
  else{
    router.navigate(['/login']);
    return false;
  }
}

export const isAlreadyLoggedInGuard: CanActivateFn =  ()=>{
  const authservice = inject(AuthService);
  const router = inject(Router);
  var logged =  authservice.isLoggedIn();
  if(logged){
    router.navigate(['/product']);
    return false;
  }
  else{
    return true;
  }
}
