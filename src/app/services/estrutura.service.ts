import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estrutura } from '../models/estrutura.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()

export class EstruturaService {
  API: string = environment.END_API;
  
  constructor(private http: HttpClient) {}


   obterEstrutura() : Observable<Estrutura>{
    return this.http.get<Estrutura>(`${this.API}/estrutura`);
   }

 
}
