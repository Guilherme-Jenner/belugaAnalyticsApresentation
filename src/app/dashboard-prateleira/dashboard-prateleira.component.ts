import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CardComponent} from "../shared/card/card.component";
import { SideBarComponent } from "../shared/side-bar/side-bar.component";
import { HttpService } from "../services/http.service"
import {IDadosDispostivo} from "../interface/DadosDispositivo.interface";
import {AgCharts} from "ag-charts-angular";
import { AgChartOptions, AgLineSeriesOptions } from "ag-charts-community";
import * as d3 from 'd3';
import {format, parseISO} from "date-fns";
import {HeaderComponent} from "../shared/header/header.component";
import { IDispositivo } from '../interface/Dispositivo.interface';
import { DatePipe } from '@angular/common';
import { GlobalService } from '../services/global.service';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DxDataGridModule } from 'devextreme-angular';
import { ISecao } from '../interface/Secao.interface';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-dashboard-prateleira',
  standalone: true,
  imports: [CardComponent, SideBarComponent, AgCharts, HeaderComponent, DatePipe, DxDataGridModule, RouterLink],
  templateUrl: './dashboard-prateleira.component.html',
  styleUrl: './dashboard-prateleira.component.css'
})
export class DashboardPrateleiraComponent {
  data! : IDadosDispostivo
  prateleiraId: string;
  
    secoes: ISecao[] = [];
  
    dispositivos! : IDispositivo[]
  
    graphicOption! : AgChartOptions
  
    statusTraduzido = (status : string) => {
      switch(status){
        case 'Ativo':
          return 'Ativo'
        case 'Em_Manutencao':
          return 'Em Manutenção'
        default:
          return 'Inativo'
      }
    }
  
    classeStatus = (status : string) => {
      switch(status){
        case 'Ativo':
          return 'success'
        case 'Em_Manutencao':
          return 'warning'
        default:
          return 'danger'
      }
    }
  
    constructor(private httpService : HttpService, private globalService : GlobalService, private route : ActivatedRoute){
      this.prateleiraId = route.snapshot.paramMap.get('prateleiraId')!;
    }
  
    ngOnInit(): void {
      this.getData();
      //this.initializeGraphic();
    }
  
    getData(){
      this.httpService.getDadosByPrateleira(parseInt(this.prateleiraId)).subscribe({
        next: (data) => {
          this.data = data;
          this.initializeGraphic();
        },
        error: (errorResponse) => {
          notify(errorResponse.error, "error", 2000);
        }
      });
  
      this.httpService.getSecoesByPrateleira(parseInt(this.prateleiraId)).subscribe(secoes => {
        secoes.forEach(p => p.satisfacao = parseFloat(p.satisfacao?.toFixed(2)!));
        this.secoes = secoes;
      });
    }
    initializeGraphic(){
      this.graphicOption = {
        title: {
          text: "Comparação por Data",
        },
        data: this.data.dadosPorTempo,
        series: [
          {
            type: "line",
            xKey: "dataCriacao",
            yKey: "totalVisitantes",
            yName: "Total de Visitantes",
          },
          {
            type: "line",
            xKey: "dataCriacao",
            yKey: "engajamentos",
            yName: "Engajamentos",
          },
        ] as AgLineSeriesOptions[],
        axes: [
          {
            type: 'category',
            position: 'bottom',
            label: {
              rotation: -45, // Girar rótulos do eixo X para facilitar a visualização
              padding: 10   // Adicionar padding para evitar corte
            }
          },
          {
            type: 'number',
            position: 'left'
          }
        ]
      }
    }
}
