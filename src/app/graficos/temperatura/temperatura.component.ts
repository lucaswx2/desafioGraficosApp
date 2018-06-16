import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';
import {trigger, state, style, transition, animate} from '@angular/animations'

@Component({
  selector: 'grafico-temperatura',
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
export class TemperaturaComponent implements OnInit {
  @Input() min: any;
  @Input() max: any;
  @Input() atual: any;
  grafico: Chart;
  estadoGrafico = 'ready';
  constructor() { }

  ngOnInit() {
    let min = parseFloat(this.min);
    let max = parseFloat(this.max);
    let atual = parseFloat(this.atual);
    this.geraGraficoTemperatura(min, max, atual);
  }


  
  geraGraficoTemperatura(min: number, max: number, atual: number) {
    let percent = max/100;
    this.grafico = new Chart({
      chart: {
        type: 'gauge',
        animation:true,
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
      },
      title: {
        text: 'Temperatura'
      },
      pane: {
        startAngle: -150,
        endAngle: 150,
        background: [
          {
            backgroundColor: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [
                [0, '#ffffff'],
                [1, '#FFF']
              ]
            },
            borderWidth: 1,
            outerRadius: '107%'
          }, {
            backgroundColor: '#ffffff',
            borderWidth: 0,
            outerRadius: '105%',
            innerRadius: '103%'
          }
        ]

      },
      yAxis: {
        min: min,
        max: max,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',

        labels: {
          step: 2,
        },
        title: {
          text: '°C'
        },
        plotBands: [
          {
            from: percent*0,
            to: percent*35,
            color: '#4bf442' // verde
          },
          {
            from: percent*35,
            to: percent*80,
            color: '#f4f141' // amarelo
          },
          {
            from: percent*80,
            to: percent*100,
            color: '#f44141' // vermelho
          },
        ]
      },
      series: [{
        name: 'Temperatura',
        data: [atual],
      }]
    });
  }
}
