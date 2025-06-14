import { IsNotEmpty, IsString } from "class-validator";

export class CriarProdutosDto {
  @IsNotEmpty({ message: "Digite um nome para o produto!" })
  @IsString({ message: "Formato de dado inválido!" })
  nome: string;

  @IsNotEmpty({ message: "Digite uma descricao para o produto!" })
  descricao: string;

  @IsNotEmpty({ message: "Digite um preço para o produto!" })
  preco: string;
}
