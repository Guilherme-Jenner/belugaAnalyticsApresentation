import {Component, Input, OnInit, ChangeDetectorRef} from '@angular/core';
import { PopUpLojaComponent } from '../pop-up-loja/pop-up-loja.component';
import { GlobalService } from '../../services/global.service';
import { PopUpMarcaComponent } from "../pop-up-marca/pop-up-marca.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PopUpLojaComponent, PopUpMarcaComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  @Input() title : string = "Analytics da Loja"
  marca : any;
  popUpMarcaAberto : boolean = false;
  popUpLojaAberto : boolean = false;

  constructor(private globalService : GlobalService){}

  ngOnInit(): void {
    this.getMarca();
  }

  getMarca(){
    const marca = JSON.parse(localStorage.getItem('marca') || '[]');
    if(marca.length === 0){
      this.popUpMarcaAberto = true;
    }
    else {
      this.marca = marca;
    } 
  }

  abrirDropdown(){
    this.popUpLojaAberto = !this.popUpLojaAberto;
  }

  fecharPopUpMarca(){
    this.popUpMarcaAberto = false;
    window.location.reload();
  }
}
