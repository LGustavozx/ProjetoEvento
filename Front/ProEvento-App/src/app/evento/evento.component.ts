import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss'],
})
export class EventoComponent {
  public eventosFiltrados: any = [];
  public eventos: any = [];

  showImagem: boolean = true;

  private _filterList: string = '';

  public get filterList() {
    return this._filterList;
  }

  public set filterList(value: string) {
    this._filterList = value;
    this.eventosFiltrados = this.filterList
      ? this.filterEventos(this.filterList)
      : this.eventos;
  }

  filterEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: any) =>
        evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getEventos();
  }

  alterImage() {
    this.showImagem = !this.showImagem;
  }

  getEventos(): void {
    this.http.get('https://localhost:5001/api/evento').subscribe(
      (response) => {
        this.eventos = response;
        this.eventosFiltrados = this.eventos;
      },
      (error) => console.log(error)
    );
  }
}
