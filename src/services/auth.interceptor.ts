import {inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auths.service';

export const authInterceptor: HttpInterceptorFn = (req, next) =>{
  const authservice = inject(AuthService);
  const token = authservice.getToken();

  if(token){
    const clone = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clone);
  }
  return next(req);
}
