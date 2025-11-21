import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractCrudService } from "./crud/abstract-crud.service";

export interface Commande {
  id: number;
  clientId: number;
  dateCommande: Date;
  statut: string;
  montantTotal: number;
}

export interface CommandeBaseDto {
  statut: string;
  montantTotal: number;
}

@Injectable({
  providedIn: 'root'
})
export class CommandeService extends AbstractCrudService<Commande, CommandeBaseDto> {
  protected apiUrl = 'http://localhost:5251/api/Commandes';

  constructor(http: HttpClient) {
    super(http);
  }
}
