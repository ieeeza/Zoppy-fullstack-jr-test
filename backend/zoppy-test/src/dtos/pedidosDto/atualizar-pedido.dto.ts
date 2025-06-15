import { IsOptional, IsNotEmpty } from "class-validator";

export class AtualizarPedidoDto {
  @IsOptional()
  @IsNotEmpty({ message: "A descrição não pode ser vazia se fornecida!" })
  descricao?: string;
}
