import { Cliente } from "./entities/cliente.entity";
import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CriarClienteDto } from "./dtos/criar-cliente.dto";
import { AtualizarClienteDto } from "./dtos/atualizar-cliente.dto";
import { Repository } from "typeorm";

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async CriarCliente(criarClienteDto: CriarClienteDto): Promise<Cliente> {
    const clienteExiste = await this.clienteRepository.findOne({
      where: { email: criarClienteDto.email },
    });

    if (clienteExiste) {
      throw new ConflictException("Email ja cadastrado!");
    }

    const novoCliente = this.clienteRepository.create(criarClienteDto);

    return await this.clienteRepository.save(novoCliente);
  }

  async listarClientes(): Promise<Cliente[]> {
    return await this.clienteRepository.find();
  }

  async atualizarCliente(
    id: string,
    atualizarClienteDto: AtualizarClienteDto,
  ): Promise<Cliente | null> {
    const cliente = await this.clienteRepository.findOne({ where: { id } });

    if (!cliente) {
      return null;
    }

    if (
      atualizarClienteDto.email &&
      atualizarClienteDto.email !== cliente.email
    ) {
      const clienteComEmailExistente = await this.clienteRepository.findOne({
        where: { email: atualizarClienteDto.email },
      });
      if (clienteComEmailExistente && clienteComEmailExistente.id !== id) {
        throw new ConflictException("Já existe um cliente usando esse email.");
      }
    }

    Object.assign(cliente, atualizarClienteDto);

    return await this.clienteRepository.save(cliente);
  }
}
