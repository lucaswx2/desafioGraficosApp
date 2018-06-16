import { Component, OnInit } from '@angular/core';
import { GraficosService } from './services/graficos.service';
import { EstruturaService } from './services/estrutura.service';
import { Estrutura } from './models/estrutura.model';
import { Dispositivo } from './models/dispositivo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  
  constructor() { }

}
