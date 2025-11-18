import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { response } from "express";
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

import { Observable, tap } from "rxjs";

export interface LoginResponse {
  accessToken: string;
  expireAt: Date;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private apiUrl = 'http://localhost:5251/api/Auth/login';
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient){}

  login(req:LoginRequest): Observable<LoginResponse>{
    return this.http
    .post<LoginResponse>(`${this.apiUrl}`,req )
    .pipe(tap(response =>{
      if (isPlatformBrowser(this.platformId)){
        localStorage.setItem("token", response.accessToken);
        localStorage.setItem("expireAt", response.expireAt.toString());
      }
    }))
  }

  logout(){
    if (isPlatformBrowser(this.platformId)){
      localStorage.removeItem("token");
      localStorage.removeItem("expireAt");
    }
  }

  getToken(): string | null{
    if (isPlatformBrowser(this.platformId))
      return localStorage.getItem("token")
    return null
  }

  isLoggedIn(){
    if (isPlatformBrowser(this.platformId)){
      if(localStorage.getItem("token") != null && localStorage.getItem("expireAt") != null){
        let expireDate = new Date(localStorage.getItem("expireAt")!);
        let now = new Date();

        return expireDate > now;
      }
    }

    return false;
  }

  register(req:RegisterRequest): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/register`, req);
  }
}
