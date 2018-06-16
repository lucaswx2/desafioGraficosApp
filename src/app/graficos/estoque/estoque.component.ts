import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';
import {trigger, state, style, transition, animate} from '@angular/animations'

@Component({
  selector: 'grafico-estoque ',
  template: '<div [chart]="grafico" [@graficoAparece]="estadoGrafico"></div>',
  animations: [
    trigger('graficoAparece', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translateY(-20px)'}),
        animate('500ms 0s ease-in')
      ])
    ])
  ]
 
})

export class EstoqueComponent implements OnInit {
  @Input() min: any;
  @Input() max: any;
  @Input() atual: any;
  @Input() label: any = "Item";
  grafico: Chart;
  estadoGrafico = 'ready';

  constructor() { }

  ngOnInit() {
    let min = parseFloat(this.min);
    let max = parseFloat(this.max);
    let atual = parseFloat(this.atual);
    this.geraGraficoEstoque(min, max, atual, this.label);
  }


  geraGraficoEstoque(min: number, max: number, atual: number, label = "") {

    this.grafico = new Chart({
      chart: {
        renderTo: 'container',
        type: 'column',
        animation:true,
        options3d: {
          enabled: true,
          alpha: 15,
          beta: 15,
          depth: 50,
          viewDistance: 25
        }
      },
      title: {
        text: `Quantidade em Estoque`
      },
      xAxis: {
        categories: ['Único']
      },
      yAxis: {
        min: min,
        max: max,
      },
      plotOptions: {
        column: {
          depth: 25
        }
      },
      series: [{
        name: label,
        data: [atual]
      }]
    });
  }


}
