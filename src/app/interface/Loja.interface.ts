export interface ILoja {
    id: number;
    nome: string;
    localizacaoId?: number;
    tipoLoja?: string;
    area?: number;
    cnpj?: string;
    funcionarios?: any[];
    capacidade?: number;
    satisfacao?: number;
    engajamento?: number;
    visitantes?: number;
    marcaId: number;
    horaFuncionamento?: string;
}
