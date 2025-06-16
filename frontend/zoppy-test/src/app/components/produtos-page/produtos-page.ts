import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

interface Produto {
  id: string;
  nome: string;
  preco: number;
  descricao: string;
}

@Component({
  selector: "app-produtos-page",
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./produtos-page.html",
  styleUrl: "./produtos-page.css",
})
export class ProdutosPage implements OnInit {
  constructor(private readonly http: HttpClient) {}

  listaDeProdutos: Produto[] = [];
  idProdutoParaAtualizar: string | null = null;
  nomeProduto: string = "";
  precoProduto: number | null = null;
  descricaoProduto: string = "";
  isEditMode: boolean = false;

  ngOnInit(): void {
    this.BuscarProdutos();
  }

  BuscarProdutos() {
    this.http.get<Produto[]>("http://localhost:3000/produtos").subscribe({
      next: (data) => {
        this.listaDeProdutos = data;
      },
      error: (error) => {
        alert(`Erro ao carregar os produtos: ${error}`);
      },
    });
  }

  CarregarProdutoParaEdicao(id: string) {
    this.http.get<Produto>(`http://localhost:3000/produtos/${id}`).subscribe({
      next: (response) => {
        this.idProdutoParaAtualizar = response.id;
        this.nomeProduto = response.nome;
        this.precoProduto = response.preco;
        this.descricaoProduto = response.descricao;
        this.isEditMode = true;
      },
      error: (error) => {
        alert(
          `Erro ao buscar o produto para edição: ${error}`,
        );
      },
    });
  }

  CadastrarProduto() {
    if (
      !this.nomeProduto ||
      this.precoProduto === null ||
      !this.descricaoProduto
    ) {
      alert("Por favor, preencha todos os campos do produto.");
      return;
    }

    const novoProduto = {
      nome: this.nomeProduto,
      preco: this.precoProduto,
      descricao: this.descricaoProduto,
    };

    this.http.post("http://localhost:3000/produtos", novoProduto).subscribe({
      next: (response) => {
        alert("Produto cadastrado com sucesso!");
        console.log("Produto cadastrado:", response);
        this.LimparFormulario();
        this.BuscarProdutos();
      },
      error: (error) => {
        console.error("Erro ao cadastrar produto:", error);
        alert("Erro ao cadastrar produto.");
      },
    });
  }

  SalvarAtualizacaoProduto() {
    if (!this.idProdutoParaAtualizar) {
      alert("Nenhum produto selecionado para atualização.");
      return;
    }

    if (
      !this.nomeProduto ||
      this.precoProduto === null ||
      !this.descricaoProduto
    ) {
      alert("Por favor, preencha todos os campos do produto.");
      return;
    }

    const produtoAtualizado = {
      id: this.idProdutoParaAtualizar,
      nome: this.nomeProduto,
      preco: this.precoProduto,
      descricao: this.descricaoProduto,
    };

    this.http
      .post(
        `http://localhost:3000/produtos/${this.idProdutoParaAtualizar}`,
        produtoAtualizado,
      )
      .subscribe({
        next: (response) => {
          alert("Produto atualizado com sucesso!");
          this.LimparFormulario();
          this.BuscarProdutos();
        },
        error: (error) => {
          alert("Erro ao atualizar produto.");
        },
      });
  }

  LimparFormulario() {
    this.idProdutoParaAtualizar = null;
    this.nomeProduto = "";
    this.precoProduto = null;
    this.descricaoProduto = "";
    this.isEditMode = false;
  }

  DeletarProduto(id: string) {
    if (confirm(`Tem certeza que deseja excluir o produto com ID: ${id}?`)) {
      this.http.post(`http://localhost:3000/produtos/deletar/${id}`, {}).subscribe({
        next: (response) => {
          alert("Produto excluído com sucesso!");
          this.BuscarProdutos();
        },
        error: (error) => {
          alert(`Erro ao excluir o produto: ${error}`);
        },
      });
    }
  }
}
