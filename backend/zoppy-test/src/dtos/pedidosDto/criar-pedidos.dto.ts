import { IsNotEmpty, IsString } from "class-validator";

export class CriarPedidoDto {
  @IsNotEmpty({ message: "Cliente não encontrado, por favor relogue!" })
  clienteId: string;

  @IsNotEmpty({ message: "Informe um produto para o cliente!" })
  produto: string;

  @IsString({ message: "Tipo de dado inválido!" })
  @IsNotEmpty({ message: "Coloque uma descrição do pedido" })
  descricao: string;
}
