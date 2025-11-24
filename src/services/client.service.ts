import { HttpClient } from "@angular/common/http";
import { AbstractCrudService } from "./crud/abstract-crud.service";
import { Injectable } from "@angular/core";

export interface Client {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  dateCreation: Date;
}

export interface ClientBaseDto {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService extends AbstractCrudService<Client, ClientBaseDto, ClientBaseDto >{
  protected apiUrl = 'http://localhost:5251/api/Clients';

  constructor(http: HttpClient) {
    super(http);
  }
}
