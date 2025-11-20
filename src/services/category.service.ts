import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { GenericCrudService } from "./generic-crud.service";

export interface Category {
  id: number,
  nom: string,
  description: string
}
export interface CategorieDto {
  nom: string | null,
  description: string | null
}

@Injectable({providedIn:'root'})
export class CategoryService extends GenericCrudService<Category, CategorieDto>{

  protected apiUrl : string = "http://localhost:5251/api/Categorie";

  constructor( http: HttpClient){
    super(http);
  }

}



