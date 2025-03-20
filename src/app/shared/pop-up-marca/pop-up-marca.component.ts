import { Component, EventEmitter, Output } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { HttpService } from '../../services/http.service';
import { FormsModule } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-pop-up-marca',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pop-up-marca.component.html',
  styleUrl: './pop-up-marca.component.css',
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
export class PopUpMarcaComponent {
  constructor(private httpService: HttpService) {}
  
    @Output() fecharPopup = new EventEmitter<null>();
  
    marca = {
      nome: '',
      cnpj: ''
    };
  
    fechar() {
      this.fecharPopup.emit();
    }
  
    salvarLoja(){
      console.log(this.marca);
      this.httpService.salvarMarca(this.marca).subscribe((res: any) => {
        localStorage.setItem('marca', JSON.stringify(res));
        this.fecharPopup.emit();
        notify({
          message: 'Marca salva com sucesso',
          type: 'success'
        });
      });
    }
}
