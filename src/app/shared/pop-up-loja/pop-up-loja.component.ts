import { Component, EventEmitter, Output } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import notify from 'devextreme/ui/notify';

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
    cnpj: '',
    marcaId: 0
  };

  fechar() {
    this.fecharPopup.emit();
  }

  salvarLoja(){
    const marca = JSON.parse(localStorage.getItem('marca') || '[]');
    this.loja.marcaId = marca.marcaId;

    this.httpService.salvarLoja(this.loja).subscribe((res: any) => {
      this.fecharPopup.emit();
      notify({
        message: 'Loja salva com sucesso',
        type: 'success'
      });
    });
  }
}
