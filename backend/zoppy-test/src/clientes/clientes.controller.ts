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
import { CriarClienteDto } from "../dtos/criar-cliente.dto";
import { Cliente } from "../entities/cliente.entity";
import { AtualizarClienteDto } from "../dtos/atualizar-cliente.dto";
import { ClientesService } from "./clientes.service";

@Controller("clientes")
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async ListarUsuarios(): Promise<Cliente[]> {
    const clientes = this.clientesService.listarClientes();
    return clientes;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async CadastrarUsuario(
    @Body() criarClienteDto: CriarClienteDto,
  ): Promise<Cliente> {
    const novoCliente =
      await this.clientesService.CriarCliente(criarClienteDto);
    return novoCliente;
  }

  @Post(":id")
  @HttpCode(HttpStatus.OK)
  async AtualizarUsuario(
    @Param("id") id: string,
    @Body() atualizarClienteDto: AtualizarClienteDto,
  ): Promise<Cliente> {
    const clienteAtualizado = await this.clientesService.atualizarCliente(
      id,
      atualizarClienteDto,
    );
    if (!clienteAtualizado) {
      throw new NotFoundException(`Cliente com ${id} não encontrado.`);
    }
    return clienteAtualizado;
  }

  @Post(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async apagarCliente(@Param("id") id: string): Promise<void> {
    await this.clientesService.apagarCliente(id);
  }
}
