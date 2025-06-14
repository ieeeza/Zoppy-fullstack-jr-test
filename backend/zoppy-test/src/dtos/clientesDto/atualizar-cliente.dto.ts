import { IsEmail, IsOptional, IsString } from "class-validator";

export class AtualizarClienteDto {
  @IsOptional()
  @IsString({ message: "Tipo de dado inválido." })
  nome?: string;

  @IsOptional()
  @IsEmail({}, { message: "O email deve ser um endereço de email válido." })
  email?: string;

  @IsOptional()
  @IsString({ message: "Tipo de dado inválido." })
  numero?: string;
}
