export interface ILoja {
    Id: number;
    Nome: string;
    LocalizacaoId?: number;
    TipoLoja?: string;
    Area?: number;
    Cnpj?: string;
    Funcionarios?: any[];
    Capacidade?: number;
    Hora_Funcionamento?: string;
}
