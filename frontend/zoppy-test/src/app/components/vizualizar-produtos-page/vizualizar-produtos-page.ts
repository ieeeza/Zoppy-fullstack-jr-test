import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ProdutosService } from "../../service/produtosService/produtos-service";
import { ModalEditarProduto } from "../shared/modal-editar-produto/modal-editar-produto";
import { RouterLink } from "@angular/router";

interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
}

@Component({
  selector: "app-vizualizar-produtos-page",
  imports: [CommonModule, ModalEditarProduto, RouterLink],
  templateUrl: "./vizualizar-produtos-page.html",
  styleUrl: "./vizualizar-produtos-page.css",
})
export class VizualizarProdutosPage implements OnInit {
  constructor(private readonly produtosService: ProdutosService) {}

  listaDeProdutos: Produto[] = [];

  ngOnInit(): void {
    this.buscarProduto();
  }

  mostrarModalEditar: boolean = false;
  produtoSelecionado: Produto = { id: "", nome: "", descricao: "", preco: "" };

  buscarProduto(): void {
    this.produtosService.getProdutos().subscribe({
      next: (data: Produto[]) => {
        this.listaDeProdutos = data;
      },
      error: (error: any) => {
        console.error("Erro", error);
        alert(`Erro ao buscar produtos. ${error.error.message}`);
      },
    });
  }

  deletarProduto(id: string): void {
    this.produtosService.deletarProdutos(id).subscribe({
      next: () => {
        alert("Produto deletado com sucesso!");
      },
      error: (error) => {
        console.error("Erro ao deletar produto", error);
        alert("Erro ao deletar produto!");
      },
    });
  }

  salvarModal(dados: { nome: string; descricao: string; preco: string }) {
    const produtoEditado: Produto = {
      ...this.produtoSelecionado,
      ...dados,
    };

    this.salvarProdutoEditado(produtoEditado);
  }

  salvarProdutoEditado(produto: Produto): void {
    this.produtosService.atualizarProdutos(produto.id, produto).subscribe({
      next: () => {
        alert("Produto atualizado com sucesso!");
        this.buscarProduto();
        this.mostrarModalEditar = false;
      },
      error: (error: any) => {
        console.error("Erro ao atualizar produto:", error);
        alert(`Erro ao atualizar produto. ${error.error.message}`);
      },
    });
  }

  abrirModalEditar(produto: Produto) {
    this.produtoSelecionado = { ...produto };
    this.mostrarModalEditar = true;
  }
}
