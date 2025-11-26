import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
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
  private apiUrlLogin = 'http://localhost:5251/api/Auth/login';
  private apiUrlRegister = 'http://localhost:5251/api/Auth/register';
  private platformId = inject(PLATFORM_ID);
  isInitialized = false;

  constructor(private http: HttpClient){}

  login(req:LoginRequest): Observable<LoginResponse>{
    return this.http
    .post<LoginResponse>(`${this.apiUrlLogin}`,req )
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
    if (!isPlatformBrowser(this.platformId)) {
      return true;
    }

    const token = localStorage.getItem("token");
    const expireAt = localStorage.getItem("expireAt");

    if (!token || !expireAt) {
      this.isInitialized = true;
      return false;
    }

    const expireDate = new Date(expireAt);
    const now = new Date();
    this.isInitialized = true;
    return expireDate > now;
  }

  register(req:RegisterRequest): Observable<any>{
    return this.http.post<any>(`${this.apiUrlRegister}`, req);
  }
}
