import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lote } from '../models/Lote';

@Injectable()
export class LoteService {
  baseUrl = 'https://localhost:5001/api/lotes';

  constructor(private http: HttpClient) {}

  getLotesByEventoId(eventoId : number): Observable<Lote[]> {
    return this.http.get<Lote[]>(`${this.baseUrl}/${eventoId}`);
  }

  saveLote(eventoId:number, lotes: Lote): Observable<Lote[]> {
    return this.http.put<Lote[]>(`${this.baseUrl}/${eventoId}`,lotes);
  }

  deleteLote(eventoId: number,loteid: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${eventoId}/${loteid}`);
  }
}
