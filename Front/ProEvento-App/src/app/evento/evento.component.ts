import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss'],
})
export class EventoComponent {
  public eventos: any;



  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getEventos();
  }

  getEventos(): void {
    this.http.get('https://localhost:5001/api/evento').subscribe(
      response => this.eventos = response,
      error => console.log(error),
    );

  }
}
