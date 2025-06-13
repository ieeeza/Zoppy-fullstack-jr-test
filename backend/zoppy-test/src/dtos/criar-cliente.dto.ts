import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CriarClienteDto {
  @IsNotEmpty({ message: "Digite um nome para o cliente!" })
  @IsString({ message: "Formato de dado onválido!" })
  nome: string;

  @IsNotEmpty({ message: "Digite um email para o cliente!" })
  @IsEmail({}, { message: "Digite um endereço de email válido!" })
  email: string;

  @IsNotEmpty({ message: "Digite um número para o cliente!" })
  numero: string;
}
