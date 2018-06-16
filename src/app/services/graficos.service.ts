import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GraficosService {

  API: string = environment.END_API;

  constructor(private http: HttpClient) { }



  obterAnosXml(): Observable<any> {
    return this.http.get(`${this.API}/xml/anos`);
  }

  obterMesesXml(ano: number): Observable<any> {
    return this.http.get(`${this.API}/xml/meses/${ano}`);
  }

  obterDiasXml(ano: number, mes: number): Observable<any> {
    return this.http.get(`${this.API}/xml/dias/${ano}/${mes}`);
  }

  obterSaidas(ano: number, mes: number, dia: number) {
    return this.http.get(`${this.API}/xml/saidas/${ano}/${mes}/${dia}`).pipe(map((dados:any) =>dados.saida));
  }
}
