import { Component, OnInit, Output } from '@angular/core';
import { GraficosService } from '../../services/graficos.service';
import { EventEmitter } from '@angular/core';
import { Dispositivo } from '../../models/dispositivo.model';
import { trigger, state, style, transition, animate } from '@angular/animations'

@Component({
  selector: 'app-seleciona-dados',
  templateUrl: './seleciona-dados.component.html',
  styleUrls: ['./seleciona-dados.component.scss'],
  animations: [
    trigger('mostraSelects', [
      state('ready', style({
        opacity: 1,
        "height": "70px",
        "margin-top": "50px"
      })),
      transition('void => ready', [
        style({
          opacity: 0,
          "height": "0px",
          "margin-top": "20px"
        }),
        animate('800ms 0s ease-in-out')
      ])
    ])
  ]
})

export class SelecionaDadosComponent implements OnInit {
  anoSelecionado: number;
  mesSelecionado: number;
  diaSelecionado: number;
  saidaSelecionada: Array<Dispositivo>;
  anos: Array<number>;
  meses: Array<number>;
  dias: Array<number>;
  saidas: Array<any>;
  selectsEstado = 'ready';
  @Output() dataEscolhida = new EventEmitter();

  constructor(private graficosService: GraficosService) { }

  ngOnInit() {
    this.graficosService.obterAnosXml().subscribe((resultado: Array<number>) => {
      this.anos = resultado;
    })
  }

  obterMeses() {
    let ano = this.anoSelecionado;
    this.dataEscolhida.emit(undefined);
    this.meses = undefined;
    this.dias = undefined;
    this.saidas = undefined;
    this.graficosService.obterMesesXml(ano).subscribe((resultado: Array<number>) => {
      this.meses = resultado;
    })
  }

  obterDias() {
    let ano = this.anoSelecionado;
    let mes = this.mesSelecionado;
    this.graficosService.obterDiasXml(ano, mes).subscribe((resultado: Array<number>) => {
      this.dias = resultado;
    })
  }
  obterSaidas() {
    let ano = this.anoSelecionado;
    let mes = this.mesSelecionado;
    let dia = this.diaSelecionado;

    this.graficosService.obterSaidas(ano, mes, dia).subscribe((resultado) => {
      this.saidas = resultado;
    })
  }

  obterDados() {
    this.dataEscolhida.emit(this.saidaSelecionada);
  }

}
