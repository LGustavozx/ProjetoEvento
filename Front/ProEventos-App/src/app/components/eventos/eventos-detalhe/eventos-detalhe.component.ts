import { Evento } from './../../../models/Evento';
import { EventoService } from './../../../services/evento.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-eventos-detalhe',
  templateUrl: './eventos-detalhe.component.html',
  styleUrls: ['./eventos-detalhe.component.scss'],
})
export class EventosDetalheComponent implements OnInit {
  form: FormGroup;
  evento = {} as Evento;
  estadoSalvar = 'post';

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private router: ActivatedRoute,
    private eventoService: EventoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.carregarEvento();
    this.validation();
  }

  get f(): any {
    return this.form.controls;
  }

  get bsConfig() {
    return {
      adaptativePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false,
    };
  }

  validation() {
    this.form = this.fb.group({
      tema: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(1200)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagemURL: ['', Validators.required],
    });
  }

  resetForm() {
    this.form.reset();
  }

  carregarEvento(): void {
    const eventoIdParam = this.router.snapshot.paramMap.get('id');

    if (eventoIdParam !== null) {
      this.spinner.show();

      this.estadoSalvar = 'put';

      this.eventoService.getEventoById(+eventoIdParam).subscribe(
        (evento: Evento) => {
          this.evento = { ...evento };
          this.form.patchValue(this.evento);
        },
        (error: any) => {
          this.spinner.hide(),
            this.toastr.error('Erro ao tentar carregar Evento', 'Erro !'),
            console.error(error);
        },
        () => this.spinner.hide()
      );
    }
  }

  salvarAlteracao(): void {
    this.spinner.show();
    if (this.form.valid) {
     this.evento = (this.estadoSalvar === 'post')
        ? { ...this.form.value }
        : { id: this.evento.id, ...this.form.value };

      this.eventoService[this.estadoSalvar](this.evento).subscribe(
        () => {
          this.toastr.success('Evento salvo com sucesso', 'Sucesso');
        },
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error('Erro ao salvar evento', 'Erro');
        },
        () => {
          this.spinner.hide();
        }
      );
    }
  }
}
