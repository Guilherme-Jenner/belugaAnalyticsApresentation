import {Component, OnInit} from '@angular/core';
import {SideBarComponent} from "../shared/side-bar/side-bar.component";
import {HeaderComponent} from "../shared/header/header.component";
import {CardComponent} from "../shared/card/card.component";
import {DxDataGridModule} from "devextreme-angular";
import {HttpService} from "../services/http.service";
import {IDispositivo} from "../interface/Dispositivo.interface";

@Component({
  selector: 'app-dispositivos',
  standalone: true,
  imports: [
    SideBarComponent,
    HeaderComponent,
    CardComponent,
    DxDataGridModule
  ],
  templateUrl: './dispositivos.component.html',
  styleUrl: './dispositivos.component.css'
})
export class DispositivosComponent implements OnInit {
      constructor(private httpService : HttpService) {
      }

      dispositivos : IDispositivo[] = []

      ngOnInit() {
        this.getDispositivos();
      }

      getDispositivos(): void {
        this.httpService.getDispositivos(2).subscribe((dispositivos) => {
          this.dispositivos = dispositivos;
        })
      }
}
