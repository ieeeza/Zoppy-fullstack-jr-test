import { IsNotEmpty, IsString } from "class-validator";

export class CriarPedidoDto {
  @IsNotEmpty({ message: "Email não encontrado, por favor relogue!" })
  ClienteEmail: string;

  @IsNotEmpty({ message: "Digite um email para o cliente!" })
  produto: string;

  @IsString({ message: "Tipo de dado inválido!" })
  @IsNotEmpty({ message: "Coloque uma descrição do pedido" })
  descricao: string;
}
