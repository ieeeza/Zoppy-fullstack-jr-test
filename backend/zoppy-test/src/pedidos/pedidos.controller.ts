import { AtualizarPedidoDto } from "./../dtos/pedidosDto/atualizar-pedido.dto";
import { Pedido } from "src/entities/pedido.entity";
import { PedidosService } from "./pedidos.service";
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from "@nestjs/common";
import { CriarPedidoDto } from "src/dtos/pedidosDto/criar-pedidos.dto";

@Controller("pedidos")
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async ListarPedidos(): Promise<Pedido[]> {
    const pedidos = this.pedidosService.listarPedidos();
    return pedidos;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async CriarPedido(@Body() criarPedidoDto: CriarPedidoDto): Promise<Pedido> {
    const novoPedido = await this.pedidosService.criarPedido(criarPedidoDto);
    return novoPedido;
  }

  @Post(":id")
  @HttpCode(HttpStatus.OK)
  async AtualizarPedido(
    @Param("id") id: string,
    @Body() atualizarPedidoDto: AtualizarPedidoDto,
  ): Promise<Pedido> {
    const pedidoAtualizado = await this.pedidosService.atualizarPedido(
      id,
      atualizarPedidoDto,
    );

    if (!pedidoAtualizado)
      throw new NotFoundException(`Pedido com "${id}" não encontrado!`);

    return pedidoAtualizado;
  }

  @Post("deletar/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async ApagarPedido(@Param("id") id: string): Promise<void> {
    await this.pedidosService.apagarPedido(id);
  }
}
