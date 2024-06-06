import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Evento } from '../../models/Evento';
import { EventoService } from '../../services/evento.service';

import { Component, OnInit, Output, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {
  

  modalRef: BsModalRef;
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];

  larguraImagem: number = 150;
  margemImagem: number = 2;
  exibirImagem: boolean = true;
  private filtroListado: string = '';

  public get filtroLista(): string {
    return this.filtroListado;
  }

  public set filtroLista(value: string) {
    this.filtroListado = value;
    this.eventosFiltrados = this.filtroLista
      ? this.filtrarEventos(this.filtroLista)
      : this.eventos;
  }



  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner : NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getEventos();
  }

  filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento) =>
        evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  alterarImagem(): void {
    this.exibirImagem = !this.exibirImagem;
  }

  public getEventos(): void {
  this.eventoService.getEvento().subscribe({
    next: (eventos: Evento[]) => {
      this.eventos = eventos;
      this.eventosFiltrados = this.eventos
    },
    error : (error: any) =>  {
      this.spinner.hide();
      this.toastr.error('Erro ao carregar os Eventos', ' Error')
    },
    complete: () => this.spinner.hide()
   });
 }

  openModal(template: TemplateRef<any>) : void{
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef.hide();
    this.toastr.success('Deletado com sucesso', 'Deletado !')
  }

  decline(): void {
    this.modalRef.hide();
  }
}