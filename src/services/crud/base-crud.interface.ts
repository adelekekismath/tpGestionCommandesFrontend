import { Observable } from "rxjs";


export interface IBaseCrudService<T, CreateDto> {
  getAll(): Observable<T[]>;
  get(id: number): Observable<T>;
  create(dto: CreateDto): Observable<T>;
  update(id: number, dto: CreateDto): Observable<T>;
  delete(id: number): Observable<void>;
}
