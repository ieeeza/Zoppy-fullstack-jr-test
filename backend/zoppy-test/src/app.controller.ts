import { Body, Controller, Post, HttpStatus, HttpCode } from "@nestjs/common";
import { AppService } from "./app.service";
import { CriarClienteDto } from "./dtos/criar-cliente.dto";
import { Cliente } from "./entities/cliente.entity";

@Controller("clientes")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async CadastrarUsuario(
    @Body() criarClienteDto: CriarClienteDto,
  ): Promise<Cliente> {
    console.log("Received data for new client:", criarClienteDto);
    const novoCliente = await this.appService.CriarCliente(criarClienteDto);
    console.log("Client created successfully:", novoCliente);
    return novoCliente;
  }
}
