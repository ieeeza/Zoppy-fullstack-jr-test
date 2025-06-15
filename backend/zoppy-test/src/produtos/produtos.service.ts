import { Produto } from "./../entities/produto.entity";
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CriarProdutosDto } from "src/dtos/produtosDto/criar-produtos.dto";
import { Repository } from "typeorm";
import { AtualizarProdutoDto } from "src/dtos/produtosDto/atualizar-produto.dto";

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
  ) {}

  async criarProduto(criarProdutoDto: CriarProdutosDto): Promise<Produto> {
    const produtoExiste = await this.produtoRepository.findOne({
      where: { nome: criarProdutoDto.nome },
    });

    if (produtoExiste) {
      throw new ConflictException("Já existe um produto com esse nome!");
    }

    const novoProduto = this.produtoRepository.create({
      ...criarProdutoDto,
    });

    return await this.produtoRepository.save(novoProduto);
  }
  async listarProduto(): Promise<Produto[]> {
    return await this.produtoRepository.find();
  }
  async atualizarProduto(
    id: string,
    atualizarProdutoDto: AtualizarProdutoDto,
  ): Promise<Produto | null> {
    const produto = await this.produtoRepository.findOne({ where: { id } });

    if (!produto) return null;

    Object.assign(produto, atualizarProdutoDto);

    return await this.produtoRepository.save(produto);
  }
  async apagarProduto(id: string): Promise<void> {
    const produto = await this.produtoRepository.findOne({ where: { id } });
    if (!produto)
      throw new NotFoundException(`Produto com id "${id}" não encontrado`);
    await this.produtoRepository.remove(produto);
  }
}
