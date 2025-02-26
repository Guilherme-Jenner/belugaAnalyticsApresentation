import { Component, EventEmitter, Output } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-pop-up-loja',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pop-up-loja.component.html',
  styleUrl: './pop-up-loja.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(-20px)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class PopUpLojaComponent {
  constructor(private httpService: HttpService) {}

  @Output() fecharPopup = new EventEmitter<null>();

  loja = {
    nome: '',
    cnpj: ''
  };

  fechar() {
    this.fecharPopup.emit();
  }

  salvarLoja(){
    console.log(this.loja);
    this.httpService.salvarLoja(this.loja).subscribe((res: any) => {
      const lojas = JSON.parse(localStorage.getItem('loja') || '[]');
      lojas.push(res);
      
      localStorage.setItem('loja', JSON.stringify(lojas));
      this.fecharPopup.emit();
      window.location.reload();
    });
  }
}
