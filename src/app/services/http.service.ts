import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDadosDispostivo } from "../interface/DadosDispositivo.interface";
import {Observable} from "rxjs";
import {IDispositivo} from "../interface/Dispositivo.interface";
import { IZona } from '../interface/Zona.interface';
import { ILoja } from '../interface/Loja.interface';
import { IPrateleira } from '../interface/Prateleira.interface';
import { ISecao } from '../interface/Secao.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly apiUrl = 'https://localhost:7117/api';

  constructor(private http : HttpClient) { }

  getDadosByMarca(marcaId: number) : Observable<IDadosDispostivo>{
    return this.http.get<IDadosDispostivo>(`${this.apiUrl}/Beluga/GetDadosByMarca/${marcaId}`);
  }

  getDadosByLoja(lojaId: number) : Observable<IDadosDispostivo>{
    return this.http.get<IDadosDispostivo>(`${this.apiUrl}/Beluga/GetDadosByLoja/${lojaId}`);
  }

  getDadosByPrateleira(prateleiraId: number) : Observable<IDadosDispostivo>{
    return this.http.get<IDadosDispostivo>(`${this.apiUrl}/Beluga/GetDadosByPrateleira/${prateleiraId}`);
  }

  getDadosBySecao(secaoId: number) : Observable<IDadosDispostivo>{
    return this.http.get<IDadosDispostivo>(`${this.apiUrl}/Beluga/GetDadosBySecao/${secaoId}`);
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

  getLojasByMarca(marcaId : number) : Observable<ILoja[]>{
    return this.http.get<ILoja[]>(`${this.apiUrl}/Beluga/GetLojasByMarca/${marcaId}`);
  }
  
  getPrateleirasByLoja(lojaId : number) : Observable<IPrateleira[]>{
    return this.http.get<IPrateleira[]>(`${this.apiUrl}/Beluga/GetPrateleirasByLoja/${lojaId}`);
  }

  getSecoesByPrateleira(prateleiraId : number) : Observable<ISecao[]>{
    return this.http.get<ISecao[]>(`${this.apiUrl}/Beluga/GetSecoesByPrateleira/${prateleiraId}`);
  }

  salvarMarca(marca : any) : Observable<any>{
    return this.http.post(`${this.apiUrl}/Beluga/SalvarMarca`, marca);
  }
}
