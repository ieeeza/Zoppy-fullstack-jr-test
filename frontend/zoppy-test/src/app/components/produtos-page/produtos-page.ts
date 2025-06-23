import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { ProdutosService } from "../../service/produtosService/produtos-service";

interface Produto {
  id?: string;
  nome: string;
  preco: string;
  descricao: string;
}

@Component({
  selector: "app-produtos-page",
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./produtos-page.html",
  styleUrl: "./produtos-page.css",
})
export class ProdutosPage {
  constructor(private readonly produtosService: ProdutosService) {}

  nomeProduto: string = "";
  precoProduto: string = "";
  descricaoProduto: string = "";

  limparFormulario() {
    this.nomeProduto = "";
    this.precoProduto = "";
    this.descricaoProduto = "";
  }

  verificarInputs(): boolean {
    const inputsFormatado: Produto = {
      nome: this.nomeProduto.trim(),
      preco: this.precoProduto.trim(),
      descricao: this.descricaoProduto.trim(),
    };

    if (
      !inputsFormatado.nome ||
      !inputsFormatado.preco ||
      !inputsFormatado.descricao
    ) {
      alert("Preencha todos os campos, por favor!");
      return false;
    }

    return true;
  }

  cadastrarProduto(): void {
    const novoProduto: Produto = {
      nome: this.nomeProduto,
      preco: this.precoProduto,
      descricao: this.descricaoProduto,
    };

    if (!this.verificarInputs()) {
      return;
    }

    this.produtosService.cadastrarProdutos(novoProduto).subscribe({
      next: () => {
        alert("Produto cadastrado com sucesso!");
        this.limparFormulario();
      },
      error: (error) => {
        console.error("Error ao cadastrar o produto.", error);
        alert(`Erro ao cadastrar produto. ${error.error.message}`);
      }
    })
  }
}
