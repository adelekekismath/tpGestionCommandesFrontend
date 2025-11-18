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

export interface ProductBaseDto{
    nom: string | null;
    description: string | null;
    prix: number | null;
    stock: number | null;
    categorieId : number | null;
}

@Injectable({providedIn: 'root'})
export class ProductService {

  private apiUrl = 'http://localhost:5251/api/Produit';

  constructor(private http: HttpClient){}

  getAll(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl);
  }

  get(id:number): Observable<Product>{
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(newProduct:ProductBaseDto): Observable<Product>{
    return this.http.post<Product>((this.apiUrl), newProduct);
  }

  put(id:number, productToUpdate:ProductBaseDto):  Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/${id}`, productToUpdate);
  }

  delete(id:number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
