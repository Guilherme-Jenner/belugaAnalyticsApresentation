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
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardComponent, SideBarComponent, AgCharts, HeaderComponent, DatePipe, DxDataGridModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  data! : IDadosDispostivo
  lojaId: string;

  prateleiras: any[] = [];

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
    this.lojaId = route.snapshot.paramMap.get('lojaId')!;
  }

  ngOnInit(): void {
    this.getData();
    //this.initializeGraphic();
  }

  getData(){
    this.httpService.getDadosByLoja(parseInt(this.lojaId)).subscribe({
      next: (data) => {
        this.data = data;
        this.initializeGraphic();
      },
      error: (errorResponse) => {
        notify({
          message: errorResponse.error,
          type: 'error',
          displayTime: 2000
        })
      }
    });

    this.httpService.getPrateleirasByLoja(parseInt(this.lojaId)).subscribe(prateleiras => {
      prateleiras.forEach(p => p.satisfacao = parseFloat(p.satisfacao?.toFixed(2)!));
      this.prateleiras = prateleiras;
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
