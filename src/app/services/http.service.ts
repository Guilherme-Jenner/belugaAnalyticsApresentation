import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IComportamentoConsumidor} from "../interface/Comportamento_Consumidor.interface";
import {Observable} from "rxjs";
import {IDispositivo} from "../interface/Dispositivo.interface";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly apiUrl = 'https://localhost:7117/api';

  constructor(private http : HttpClient) { }

  getComportamentos_Consumidor() : Observable<IComportamentoConsumidor>{
    return this.http.get<IComportamentoConsumidor>(`${this.apiUrl}/Beluga/GetComportamentoConsumidorAll`);
  }

  getDispositivos(lojaId : number) : Observable<IDispositivo[]> {
    return this.http.get<IDispositivo[]>(`${this.apiUrl}/Beluga/GetDispositivosByLoja/${lojaId}`);
  }
}
