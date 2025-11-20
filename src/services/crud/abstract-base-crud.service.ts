import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBaseCrudService } from './base-crud.interface';

export abstract class AbstractBaseCrudService<T , TDto> implements IBaseCrudService<T , TDto> {
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
