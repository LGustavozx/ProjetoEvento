import { Evento } from './../models/Evento';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  baseUrl = 'https://localhost:5001/api/eventos';

  constructor(private http: HttpClient) {}

  getEvento() : Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseUrl);
  }

  getEventosByTema(tema : string) : Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseUrl}/${tema}/tema`);
  }

  getEventoById(id : number) : Observable<Evento> {
    return this.http.get<Evento>(`${this.baseUrl}/${id}`);
  }
  post(evento:Evento) : Observable<Evento> {
    return this.http.post<Evento>(this.baseUrl, evento);
  }

  put(evento:Evento) : Observable<Evento> {
    return this.http.put<Evento>(`${this.baseUrl}/${evento.id}`,evento);
  }

  deleteEvento(id: number) : Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
