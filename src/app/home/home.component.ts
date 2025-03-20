import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CardComponent} from "../shared/card/card.component";
import { SideBarComponent } from "../shared/side-bar/side-bar.component";
import { HttpService } from "../services/http.service"
import {AgCharts} from "ag-charts-angular";
import { AgChartOptions, AgLineSeriesOptions } from "ag-charts-community";
import * as d3 from 'd3';
import {format, parseISO} from "date-fns";
import {HeaderComponent} from "../shared/header/header.component";
import { IDispositivo } from '../interface/Dispositivo.interface';
import { DatePipe } from '@angular/common';
import { GlobalService } from '../services/global.service';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { DxDataGridModule } from 'devextreme-angular';
import { ILoja } from '../interface/Loja.interface';
import { RouterLink } from '@angular/router';
import { IDadosPorTempo } from '../interface/DadosPorTempo.interface';
import { IDadosDispostivo } from '../interface/DadosDispositivo.interface';
import notify from 'devextreme/ui/notify';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, SideBarComponent, AgCharts, HeaderComponent, DatePipe, DxDataGridModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  data! : IDadosDispostivo 

  lojas! : ILoja[]

  marca: {id: number, nome: string} = JSON.parse(localStorage.getItem('marca') || '{}')

  prateleiras!: any

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

  graphicOption! : AgChartOptions

  constructor(private httpService : HttpService, private globalService : GlobalService) {

  }

  ngOnInit(): void {
    this.getData()
    this.getLojasByMarca()
  }

  getLojasByMarca(): void {
    this.httpService.getLojasByMarca(1).subscribe((lojas) => {
      lojas.forEach(l => l.satisfacao! = parseInt(l.satisfacao?.toFixed(2)!));
      this.lojas = lojas;
    });
  }

  getData(){
    this.httpService.getDadosByMarca(1).subscribe({
      next: (data : IDadosDispostivo) => {
        data.satisfacao = parseFloat(data.satisfacao?.toFixed(2)!);
        this.data = data;
        //this.data.dadosPorTempo.forEach((a : IDadosPorTempo) => a.dataCriacao = format(a.dataCriacao, 'dd/MM/yyyy'));
  
        // if(this.data.dadosPorTempo.length > 0){
        //   this.initializeGraphic()
        // }
      },
      error: (errorResponse) => {
        notify({
          message: errorResponse.error,
          type: 'error',
          displayTime: 2000
        })
      }
    })
  }

  goTo(data : any){
    console.log(data)
  }
/*
  initializeHeatMap(){
    // Aguarda a imagem carregar para obter as dimensões
    this.image.nativeElement.onload = () => {
      const imgWidth = this.image.nativeElement.width;
      const imgHeight = this.image.nativeElement.height;

      // Cria o contêiner SVG para o D3 com as dimensões da imagem
      const svg = d3.select(this.mapContainer.nativeElement)
        .append('svg')
        .attr('width', imgWidth)
        .attr('height', imgHeight)
        .style('position', 'absolute')
        .style('top', 0)
        .style('left', 0)
        .style('z-index', 2); // Coloca o SVG acima da imagem

      // Exemplo de dados para o heatmap
      const data = [
        { x: 100, y: 150, value: 0.3 },
        { x: 200, y: 300, value: 0.5 },
        { x: 400, y: 250, value: 0.8 }
      ];

      // Cria uma escala de cor para o heatmap
      const colorScale = d3.scaleSequential(d3.interpolateInferno)
        .domain([0, 1]);

      // Cria círculos para representar os pontos de calor
      svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', (d : any) => d.x)
        .attr('cy', (d : any) => d.y)
        .attr('r', (d : any) => d.value * 30) // O raio é proporcional ao valor
        .attr('fill', (d : any) => colorScale(d.value))
        .attr('opacity', 0.6);
    };
  }
*/
}
