import { IsEmpty, IsOptional } from "class-validator";

export class AtualizarProdutoDto {
  @IsOptional()
  @IsEmpty({ message: "O nome não pode ser vazia!" })
  nome?: string;

  @IsOptional()
  @IsEmpty({ message: "A descrição não pode ser vazia!" })
  descricao?: string;
}
