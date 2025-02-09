import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CardComponent} from "../shared/card/card.component";
import { SideBarComponent } from "../shared/side-bar/side-bar.component";
import { HttpService } from "../services/http.service"
import {IComportamentoConsumidor} from "../interface/Comportamento_Consumidor.interface";
import {AgCharts} from "ag-charts-angular";
import { AgChartOptions, AgLineSeriesOptions } from "ag-charts-community";
import * as d3 from 'd3';
import {format} from "date-fns";
import {HeaderComponent} from "../shared/header/header.component";



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, SideBarComponent, AgCharts, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  @ViewChild('image', { static: true }) image!: ElementRef;

  heatmapInstance!: any;


  data : IComportamentoConsumidor = {
    dadosPorTempo: [
      {
        dataCriacao: '2024-01-10T00:00:00',
        engajamentos: 12,
        entradas: 42,
      },
      {
        dataCriacao: '2024-02-10T00:00:00',
        engajamentos: 18,
        entradas: 39,
      },
      {
        dataCriacao: '2024-03-04T00:00:00',
        engajamentos: 11,
        entradas: 48,
      },
      {
        dataCriacao: '2024-04-25T00:00:00',
        engajamentos: 25,
        entradas: 57,
      },
      {
        dataCriacao: '2024-05-02T00:00:00',
        engajamentos: 32,
        entradas: 56,
      },
      {
        dataCriacao: '2024-06-14T00:00:00',
        engajamentos: 43,
        entradas: 64,
      },
    ],
    interacoes: 575, tempoMedio: 8.52, totalVisitantes: 1450, zonaMaisVisitada: {
      id: 0,
      nome: ''
    },
    satisfacao: 62
  }

  graphicOption! : AgChartOptions

    constructor(private httpService : HttpService) {

    }

    ngOnInit(): void {
      //this.initializeHeatMap()
      this.initializeGraphic()
      this.getData()
    }

    getData(){
      this.httpService.getComportamentos_Consumidor().subscribe((data : any) => {
        console.log(data);
        this.data = data;
        this.data.dadosPorTempo = data.comportamento_Consumidor
        this.data.satisfacao = this.data.interacoes / this.data.totalVisitantes  * 100

        this.data.dadosPorTempo.forEach(a => a.dataCriacao = format(a.dataCriacao, 'dd/MM/yyyy'));

        this.initializeGraphic()
      })
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
  initializeGraphic(){
    this.graphicOption = {
      title: {
        text: "Comparação por Ano",
      },
      data: this.data.dadosPorTempo,
      series: [
        {
          type: "line",
          xKey: "dataCriacao",
          yKey: "entradas",
          yName: "Entradas",
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
