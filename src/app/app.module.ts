import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GraficosService } from './services/graficos.service';
import { EstruturaService } from './services/estrutura.service';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import { ChartModule,HIGHCHARTS_MODULES  } from 'angular-highcharts';
import { TemperaturaComponent } from './graficos/temperatura/temperatura.component';
import { EstoqueComponent } from './graficos/estoque/estoque.component';
import { PressaoComponent } from './graficos/pressao/pressao.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SelecionaDadosComponent } from './components/seleciona-dados/seleciona-dados.component';
import { ListagemGraficosComponent } from './components/listagem-graficos/listagem-graficos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    TemperaturaComponent,
    PressaoComponent,
    EstoqueComponent,
    HeaderComponent,
    FooterComponent,
    SelecionaDadosComponent,
    ListagemGraficosComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartModule,
    FormsModule,
  ],
  providers: [GraficosService,EstruturaService,
    { provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting ] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
