import { AtualizarPedidoDto } from "./../dtos/pedidosDto/atualizar-pedido.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Pedido } from "../entities/pedido.entity";
import { CriarPedidoDto } from "src/dtos/pedidosDto/criar-pedidos.dto";

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
  ) {}

  async criarPedido(criarPedidoDto: CriarPedidoDto): Promise<Pedido> {
    const novoPedido = this.pedidoRepository.create({
      produto: criarPedidoDto.produto,
      descricao: criarPedidoDto.descricao,
      cliente: { id: criarPedidoDto.clienteId },
    });

    return this.pedidoRepository.save(novoPedido);
  }

  async listarPedidos(): Promise<Pedido[]> {
    return await this.pedidoRepository.find({ relations: ["cliente"] });
  }

  async atualizarPedido(
    id: string,
    atualizarPedidoDto: AtualizarPedidoDto,
  ): Promise<Pedido | null> {
    const pedido = await this.pedidoRepository.findOne({ where: { id } });

    if (!pedido) return null;

    Object.assign(pedido, atualizarPedidoDto);

    return await this.pedidoRepository.save(pedido);
  }

  async apagarPedido(id: string): Promise<void> {
    const pedido = await this.pedidoRepository.findOne({ where: { id } });

    if (!pedido)
      throw new NotFoundException(`Pedido com id "${id}" não encontrado`);
    await this.pedidoRepository.remove(pedido);
  }
}
