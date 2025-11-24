import { Injectable } from "@angular/core";
import { AbstractCrudService } from "./crud/abstract-crud.service";
import { HttpClient } from "@angular/common/http";

export interface Lignecommande {
  id: number;
  commandeId: number;
  produitId: number;
  quantite: number;
  prixUnitaire: number;
}

export interface LignecommandeCreateDto {
  commandeId: number;
  produitId: number;
  quantite: number;
  prixUnitaire: number;
}

export interface LignecommandeUpdateDto {
  quantite: number;
  prixUnitaire: number;
  produitId: number;
}

@Injectable({
  providedIn: 'root'
})
export class LignecommandeService extends AbstractCrudService<Lignecommande, LignecommandeCreateDto,LignecommandeUpdateDto >{
  protected apiUrl = 'http://localhost:5251/api/LigneCommande';

  constructor(http: HttpClient) {
    super(http);
  }
}
