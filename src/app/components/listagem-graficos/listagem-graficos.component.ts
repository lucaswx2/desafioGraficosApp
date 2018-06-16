import { Component, OnInit, Input } from '@angular/core';
import { Dispositivo } from '../../models/dispositivo.model';
import { Estrutura } from '../../models/estrutura.model';
import { EstruturaService } from '../../services/estrutura.service';
import { trigger, state, style, transition, animate } from '@angular/animations'

@Component({
  selector: 'listagem-graficos',
  templateUrl: './listagem-graficos.component.html',
  styleUrls: ['./listagem-graficos.component.scss'],
 
})
export class ListagemGraficosComponent implements OnInit {
  dispositivos: Array<Dispositivo>;
  estrutura: Estrutura = undefined;
  tipo: any = {
    pressao: 'pressao',
    temperatura: 'temperatura',
    armazenamento: 'armazenamento'
  }
  estadoListagem = 'ready'

  constructor(private estruturaService: EstruturaService) { }


  ngOnInit(): void {
    this.estruturaService.obterEstrutura().subscribe((resultado: Estrutura) => {
      this.estrutura = resultado;
    })
  }

  definirGraficos(dispositivos: Array<Dispositivo>) {
    this.dispositivos = dispositivos;
  }

  obterMin(dispositivo: Dispositivo, tipo: string) {
    let nome = this.obterNome(dispositivo);
    switch (tipo) {
      case this.tipo.pressao:
        return this.estrutura[`${nome}`].pressao.min;
      case this.tipo.temperatura:
        return this.estrutura[`${nome}`].temperatura.min;
      case this.tipo.armazenamento:
        return this.estrutura[`${nome}`].armazenamento.min;
      default:
        return 0
    }
  }

  obterMax(dispositivo: Dispositivo, tipo: string) {
    let nome = this.obterNome(dispositivo);
    switch (tipo) {
      case this.tipo.pressao:
        return this.estrutura[`${nome}`].pressao.max;
      case this.tipo.temperatura:
        return this.estrutura[`${nome}`].temperatura.max;
      case this.tipo.armazenamento:
        return this.estrutura[`${nome}`].armazenamento.max;
      default:
        return 0
    }
  }

  obterNome(dispositivo: Dispositivo) {
    return dispositivo["@attributes"].nome;
  }

}
