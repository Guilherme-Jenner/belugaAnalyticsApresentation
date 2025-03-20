import { IDadosPorTempo } from "./DadosPorTempo.interface";

export interface IDadosDispostivo {
  dadosPorTempo: IDadosPorTempo[];
  totalVisitantes : number;
  tempoMedio : number;
  interacoes : number;
  satisfacao : number;
  interacaoPorcentage : number;
}
