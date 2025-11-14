import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Product {
    id: number;
    nom: string;
    description: string;
    prix: number;
    stock: number;
    categorieId : number;
    lignesCommande: [];
}

@Injectable({providedIn: 'root'})
export class ProductService {

  private apiUrl = 'http://localhost:5251/api/Produit';

  constructor(private http: HttpClient){}

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl);
  }
}
