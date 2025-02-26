import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IComportamentoConsumidor} from "../interface/Comportamento_Consumidor.interface";
import {Observable} from "rxjs";
import {IDispositivo} from "../interface/Dispositivo.interface";
import { IZona } from '../interface/Zona.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly apiUrl = 'https://localhost:7117/api';

  constructor(private http : HttpClient) { }

  getComportamentos_Consumidor(lojaId : number) : Observable<IComportamentoConsumidor>{
    return this.http.get<IComportamentoConsumidor>(`${this.apiUrl}/Beluga/GetComportamentoConsumidorAll/${lojaId}`);
  }

  getDispositivos(lojaId : number) : Observable<IDispositivo[]> {
    return this.http.get<IDispositivo[]>(`${this.apiUrl}/Beluga/GetDispositivosByLoja/${lojaId}`);
  }

  getZonasByLoja(lojaId : number) : Observable<IZona[]> {
    return this.http.get<IZona[]>(`${this.apiUrl}/Beluga/GetZonasByLoja/${lojaId}`);
  }

  salvarDispositivo(dispositivo : IDispositivo) : Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Beluga/SalvarDispositivo`, dispositivo);
  }

  removerDispositivo(id : number) : Observable<any>{
    return this.http.delete(`${this.apiUrl}/Beluga/RemoverDispositivo/${id}`);
  }

  salvarLoja(loja : any) : Observable<any>{
    return this.http.post(`${this.apiUrl}/Beluga/SalvarLoja`, loja);
  }

  
}
