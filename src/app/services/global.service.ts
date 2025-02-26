import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ILoja } from '../interface/Loja.interface';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  
  constructor() { }

  private lojaSelecionada = new BehaviorSubject<ILoja>({} as ILoja);
  lojaSelecionada$ = this.lojaSelecionada.asObservable();

  setLojaSelecionada(loja : ILoja){
    this.lojaSelecionada.next(loja);
  }
}
