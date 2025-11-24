import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AbstractCrudService } from "./crud/abstract-crud.service";

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
export class ProductService extends AbstractCrudService<Product, ProductBaseDto, ProductBaseDto >{

  protected apiUrl = 'http://localhost:5251/api/Produit';

  constructor( http: HttpClient){
    super(http);
  }

}
