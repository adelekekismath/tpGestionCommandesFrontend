import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

export interface Category {
  id: number,
  nom: string,
  description: string
}

@Injectable({providedIn:'root'})
export class CategoryService {

  private apiUrl : string = "http://localhost:5251/api/Categorie";

  constructor(private http: HttpClient){}


  getAll(): Observable<Category[]>{
    return this.http.get<Category[]>(this.apiUrl);
  }
}



