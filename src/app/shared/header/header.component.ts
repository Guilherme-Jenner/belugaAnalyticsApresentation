import {Component, Input, OnInit} from '@angular/core';
import { PopUpLojaComponent } from '../pop-up-loja/pop-up-loja.component';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PopUpLojaComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  @Input() title : string = "Analytics da Loja"
  lojaSelecionada : any;
  lojas : any[] = [];
  popUpAberto : boolean = false;
  dropdownAberto : boolean = false;

  constructor(private globalService : GlobalService){}

  ngOnInit(): void {
    const lojas = JSON.parse(localStorage.getItem('loja') || '[]');
    if(lojas.length > 0){
      this.lojas = lojas;
      this.lojaSelecionada = lojas[0];
    }
    else {
      this.popUpAberto = true;
    }
  }

  trocarLoja(loja : any){
    this.lojaSelecionada = loja;
    this.globalService.setLojaSelecionada(loja);
    this.dropdownAberto = false;
  }

  abrirDropdown(){
    this.dropdownAberto = !this.dropdownAberto;
    console.log(this.dropdownAberto);
  }
}
