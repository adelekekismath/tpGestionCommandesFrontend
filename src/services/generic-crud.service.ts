// src/app/services/generic-crud.service.ts
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CrudService } from './crud-service.interface';

export abstract class GenericCrudService<T , TDto> implements CrudService<T , TDto> {
  protected abstract apiUrl: string;

  constructor(protected http: HttpClient) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl);
  }

  get(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  create(dto: TDto): Observable<T> {
    return this.http.post<T>(this.apiUrl, dto);
  }

  update(id: number, dto: TDto): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
