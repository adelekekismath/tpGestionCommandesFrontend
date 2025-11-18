import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { AuthService } from "./auths.service";
import { Router } from "@angular/router";


export const authGuard: CanActivateFn = ()=>{
  const authservice = inject(AuthService);
  const router = inject(Router);
  console.log("isLoggedIn", authservice.isLoggedIn())
  if(authservice.isLoggedIn()){
    return true;
  }
  else{
    router.navigate(['/login']);
    return false;
  }


}
