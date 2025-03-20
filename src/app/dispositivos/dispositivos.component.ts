import {Component, OnInit, ViewChild} from '@angular/core';
import {SideBarComponent} from "../shared/side-bar/side-bar.component";
import {HeaderComponent} from "../shared/header/header.component";
import {CardComponent} from "../shared/card/card.component";
import {DxDataGridComponent, DxDataGridModule, DxToastModule} from "devextreme-angular";
import {HttpService} from "../services/http.service";
import {IDispositivo} from "../interface/Dispositivo.interface";
import notify from "devextreme/ui/notify";
import { IZona } from '../interface/Zona.interface';
import { GlobalService } from '../services/global.service';
@Component({
  selector: 'app-dispositivos',
  standalone: true,
  imports: [
    SideBarComponent,
    HeaderComponent,
    CardComponent,
    DxDataGridModule,
    DxToastModule
  ],
  templateUrl: './dispositivos.component.html',
  styleUrl: './dispositivos.component.css'
})
export class DispositivosComponent implements OnInit {
      constructor(private httpService : HttpService, private globalService : GlobalService) {
      }

      @ViewChild(DxDataGridComponent, {static: false}) dispositivosGrid?: DxDataGridComponent;
      dispositivos : IDispositivo[] = []
      setores : IZona[] = []
      statusOptions = [
        { value: 'Ativo', label: 'Ativo' },
        { value: 'Em_Manutencao', label: 'Em Manutenção' },
        { value: 'Inativo', label: 'Inativo' }
      ];

      totalDispositivos = () => this.dispositivos.length;
      totalDispositivosAtivos = () => this.dispositivos.filter(dispositivo => dispositivo.status === 'Ativo').length;
      totalDispositivosInativos = () => this.dispositivos.filter(dispositivo => dispositivo.status === 'Inativo').length;
      totalDispositivosEmManutencao = () => this.dispositivos.filter(dispositivo => dispositivo.status === 'Em_Manutencao').length;

      ngOnInit() {
        this.getDispositivos();
        this.getSetores();
      }

      getDispositivos(): void {
        this.globalService.lojaSelecionada$.subscribe((loja) => {
          this.httpService.getDispositivos(loja.id).subscribe((dispositivos) => {
            this.dispositivos = dispositivos;
          })
        })
      }
      
      getDatagridInstance() {
        return (this.dispositivosGrid as DxDataGridComponent)?.instance;
      }

      getSetores(): void {
        this.httpService.getZonasByLoja(2).subscribe((setores) => {
          this.setores = setores;
        })
      }

      salvarDispositivo(event : any): void {
        const datagridInstance = this.getDatagridInstance();
        if(typeof event.data.id === 'string') {
          event.data.id = -1;
        }
        this.httpService.salvarDispositivo(event.data).subscribe((dispositivo) => {
          notify("Dispositivo salvo com sucesso", "success");
          datagridInstance.refresh();
        }, (error) => {
          notify("Erro ao salvar dispositivo", "error");
          datagridInstance.refresh();
        })
      }

      removerDispositivo(event : any): void {
        const datagridInstance = this.getDatagridInstance();

        this.httpService.removerDispositivo(event.data.id).subscribe((res) => {
          notify("Dispositivo removido com sucesso", "success");
          datagridInstance.refresh();
        }, (error) => {
          notify("Erro ao remover dispositivo", "error");
          datagridInstance.refresh();
        })
      }
}
