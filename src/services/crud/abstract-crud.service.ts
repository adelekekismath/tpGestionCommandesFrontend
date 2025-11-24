import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBaseCrudService } from './base-crud.interface';

export abstract class AbstractCrudService<T , TCreateDto, TUpdateDto> implements IBaseCrudService<T , TCreateDto, TUpdateDto> {
  protected abstract apiUrl: string;

  constructor(protected http: HttpClient) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl);
  }

  get(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  create(dto: TCreateDto): Observable<T> {
    return this.http.post<T>(this.apiUrl, dto);
  }

  update(id: number, dto: TUpdateDto): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
