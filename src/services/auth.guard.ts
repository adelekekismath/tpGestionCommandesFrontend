import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { AuthService } from "./auths.service";
import { Router } from "express";


export const authGuard: CanActivateFn = ()=>{
  const authservice = inject(AuthService);
  const router = inject(Router);

  if(authservice.isLoggedIn()){
    return true;
  }

  router.navigate(['/login']);
  return false;
}
