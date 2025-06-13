import {
  Body,
  Controller,
  Post,
  Get,
  HttpStatus,
  HttpCode,
  Param,
  NotFoundException,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { CriarClienteDto } from "./dtos/criar-cliente.dto";
import { Cliente } from "./entities/cliente.entity";
import { AtualizarClienteDto } from "./dtos/atualizar-cliente.dto";

@Controller("clientes")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async CadastrarUsuario(
    @Body() criarClienteDto: CriarClienteDto,
  ): Promise<Cliente> {
    const novoCliente = await this.appService.CriarCliente(criarClienteDto);
    return novoCliente;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async ListarUsuarios(): Promise<Cliente[]> {
    const clientes = this.appService.listarClientes();
    return clientes;
  }

  @Post(":id")
  @HttpCode(HttpStatus.OK)
  async AtualizarUsuario(
    @Param("id") id: string,
    @Body() atualizarClienteDto: AtualizarClienteDto,
  ): Promise<Cliente> {
    const clienteAtualizado = await this.appService.atualizarCliente(
      id,
      atualizarClienteDto,
    );
    if (!clienteAtualizado) {
      throw new NotFoundException(`Cliente com ${id} não encontrado.`);
    }
    return clienteAtualizado;
  }
}
