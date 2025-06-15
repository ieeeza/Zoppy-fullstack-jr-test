import { Produto } from "src/entities/produto.entity";
import { ProdutosService } from "./produtos.service";
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
import { CriarProdutosDto } from "src/dtos/produtosDto/criar-produtos.dto";
import { AtualizarProdutoDto } from "src/dtos/produtosDto/atualizar-produto.dto";

@Controller("produtos")
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async ListarProdutos(): Promise<Produto[]> {
    const produtos = await this.produtosService.listarProduto();
    return produtos;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async CriarProduto(
    @Body() criarProdutosDto: CriarProdutosDto,
  ): Promise<Produto> {
    const novoProduto =
      await this.produtosService.criarProduto(criarProdutosDto);
    return novoProduto;
  }

  @Post(":id")
  @HttpCode(HttpStatus.OK)
  async ataualizarProduto(
    @Param("id") id: string,
    @Body() atualizarProdutoDto: AtualizarProdutoDto,
  ): Promise<Produto> {
    const produtoAtualizado = await this.produtosService.atualizarProduto(
      id,
      atualizarProdutoDto,
    );

    if (!produtoAtualizado)
      throw new NotFoundException(`Produto com id "${id}" não encontrado!`);

    return produtoAtualizado;
  }

  @Post("deletar/:id")
  @HttpCode(HttpStatus.NOT_FOUND)
  async apagarProduto(@Param(":id") id: string): Promise<void> {
    await this.produtosService.apagarProduto(id);
  }
}
