import { Cliente } from "./entities/cliente.entity";
import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CriarClienteDto } from "./dtos/criar-cliente.dto";
import { Repository } from "typeorm";

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Cliente)
    private readonly ClienteRepository: Repository<Cliente>,
  ) {}

  async CriarCliente(criarClienteDto: CriarClienteDto): Promise<Cliente> {
    const clienteExiste = await this.ClienteRepository.findOne({
      where: { email: criarClienteDto.email },
    });

    if (clienteExiste) {
      throw new ConflictException("Email ja cadastrado!");
    }

    const novoCliente = this.ClienteRepository.create(criarClienteDto);

    return await this.ClienteRepository.save(novoCliente);
  }
}
