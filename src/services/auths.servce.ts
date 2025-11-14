import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { response } from "express";
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
  private apiUrl = 'http://localhost:5251/api/Auth/login'

  constructor(private http: HttpClient){}

  login(req:LoginRequest): Observable<LoginResponse>{
    return this.http
    .post<LoginResponse>(`${this.apiUrl}/login`,req )
    .pipe(tap(response =>{
      localStorage.setItem("token", response.accessToken);
    }))
  }

  logout(){
    localStorage.removeItem("token");
  }

  getToken(){
    return localStorage.getItem("token")
  }

  isLoggedIn(){
    return localStorage.getItem("token") !== null;
  }

  register(req:RegisterRequest): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/register`, req);
  }
}
