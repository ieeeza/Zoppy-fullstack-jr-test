import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { Cliente } from "src/entities/cliente.entity";
import { CriarClienteDto } from "src/dtos/clientesDto/criar-cliente.dto";
import { AtualizarClienteDto } from "src/dtos/clientesDto/atualizar-cliente.dto";
import { QueryFailedError, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ClientesService {
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

    const novoCliente = this.clienteRepository.create({ ...criarClienteDto });

    return await this.clienteRepository.save(novoCliente);
  }

  async listarClientes(): Promise<Cliente[]> {
    return await this.clienteRepository.find();
  }

  async buscarCliente(id: string): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({ where: { id } });

    if (!cliente) throw new NotFoundException("Cliente não encontrado!");

    return cliente;
  }

  async atualizarCliente(
    id: string,
    atualizarClienteDto: AtualizarClienteDto,
  ): Promise<Cliente | null> {
    const cliente = await this.clienteRepository.findOne({ where: { id } });

    if (!cliente) return null;

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

  async apagarCliente(id: string): Promise<void> {
    try {
      const clienteToDelete = await this.clienteRepository.findOne({
        where: { id },
      });
      if (!clienteToDelete) {
        throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
      }

      await this.clienteRepository.delete(id);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if (error["code"] === "23503") {
          throw new ConflictException(
            "Não foi possível excluir o cliente. Existem pedidos associados a este cliente. Por favor, exclua os pedidos primeiro ou associe-os a outro cliente.",
          );
        }
      }
      throw new InternalServerErrorException(
        "Ocorreu um erro interno ao tentar excluir o cliente.",
      );
    }
  }
}
