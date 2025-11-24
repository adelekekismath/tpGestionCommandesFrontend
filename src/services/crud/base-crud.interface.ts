import { Observable } from "rxjs";


export interface IBaseCrudService<T, TCreateDto, TUpdateDto> {
  getAll(): Observable<T[]>;
  get(id: number): Observable<T>;
  create(dto: TCreateDto): Observable<T>;
  update(id: number, dto: TUpdateDto): Observable<T>;
  delete(id: number): Observable<void>;
}
