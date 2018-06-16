import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';
import {trigger, state, style, transition, animate} from '@angular/animations'

@Component({
  selector: 'grafico-pressao',
  template: ' <div [chart]="grafico" [@graficoAparece]="estadoGrafico"></div>',
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
export class PressaoComponent implements OnInit {
  @Input() min: any;
  @Input() max: any;
  @Input() atual: any;
  grafico:Chart;
  estadoGrafico = 'ready';

  ngOnInit() {
    let min = parseFloat(this.min);
    let max = parseFloat(this.max);
    let atual = parseFloat(this.atual);
    console.log(this.min);
    this.geraGraficoPressao(min,max,atual);
  }

  geraGraficoPressao(min: number, max: number, atual: number) {
    this.grafico = new Chart({
      chart: {
        type: 'gauge',
        animation:true,
        plotBackgroundImage: null,
        plotShadow: false,
        marginTop:100

      },
      title: {
        text: 'Pressão',
      },
      pane: {
        startAngle: -90,
        endAngle: 90,
        background: null,
        size: 300
      },
      tooltip: {
        enabled: false
      },
      yAxis: {
        min: min,
        max: max,
    
        plotBands: [{
          from: ((max/100)*75),
          to: max,
          color: '#C02316',
          innerRadius: '100%',
          outerRadius: '105%'
        }],
        title: {
          text: 'mbar<br/><span style="font-size:8px">Pressão atual</span>',
          y: 70
        }
      },
      plotOptions: {
        gauge: {
          dataLabels: {
            enabled: false
          },
          dial: {
            radius: '100%'
          }
        }
      },
      series: [{
        name: 'Pressão Atual',
        data: [atual],
        yAxis: 0
      }],

    });
  }

}
