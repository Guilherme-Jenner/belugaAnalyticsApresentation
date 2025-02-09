import {IZona} from "./Zona.interface";

export interface IComportamentoConsumidor {
  dadosPorTempo: any[];
  totalVisitantes : number;
  tempoMedio : number;
  interacoes : number;
  zonaMaisVisitada : IZona;
  satisfacao : number;
}
