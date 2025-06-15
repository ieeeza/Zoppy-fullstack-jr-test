import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

interface Produto {
  id: string;
  nome: string;
  preco: string;
  descricao: string;
}

@Component({
  selector: "app-produtos-page",
  imports: [CommonModule, FormsModule],
  templateUrl: "./produtos-page.html",
  styleUrl: "./produtos-page.css",
})
export class ProdutosPage {
  constructor(private readonly http: HttpClient) {}

  listaDeProdutos: Produto[] = [];
  idProdutoParaAtualizar: string | null = null;
  nomeProduto: string = "";
  precoProduto: string = "";
  descricaoProduto: string = "";
  isEditMode: boolean = false;

  ngOnInit(): void {
    this.BuscarClientes();
  }

  BuscarClientes() {
    this.http.get<Produto[]>("http://localhost:3000/clientes").subscribe({
      next: (data) => {
        this.listaDeClientes = data;
      },
      error: (err) => console.error("Erro ao carregar clientes:", err),
    });
  }

  AtualizarCliente(id: string) {
    this.http.get<Cliente>(`http://localhost:3000/clientes/${id}`).subscribe({
      next: (response) => {
        this.idClienteParaAtualizar = response.id;
        this.nomeCliente = response.nome;
        this.emailCliente = response.email;
        this.numeroCliente = response.numero;
        this.isEditMode = true;
      },
      error: (error) => {
        alert(`Erro ao buscar o cliente para edição: ${error}`);
      },
    });
  }

  CadastrarCliente() {
    const novoCliente = {
      nome: this.nomeCliente,
      email: this.emailCliente,
      numero: this.numeroCliente,
    };

    this.http.post("http://localhost:3000/clientes", novoCliente).subscribe({
      next: (response) => {
        alert("Cliente cadastrado com sucesso!");
        this.LimparFormulario();
        this.BuscarClientes();
      },
      error: (error) => {
        console.error("Erro ao cadastrar cliente:", error);
        alert("Erro ao cadastrar cliente.");
      },
    });
  }

  SalvarAtualizacaoCliente() {
    if (!this.idClienteParaAtualizar) {
      alert("Nenhum cliente selecionado para atualização.");
      return;
    }

    const clienteAtualizado = {
      id: this.idClienteParaAtualizar,
      nome: this.nomeCliente,
      email: this.emailCliente,
      numero: this.numeroCliente,
    };

    this.http
      .post(
        `http://localhost:3000/clientes/${this.idClienteParaAtualizar}`,
        clienteAtualizado,
      )
      .subscribe({
        next: (response) => {
          alert("Cliente atualizado com sucesso!");
          this.LimparFormulario();
          this.BuscarClientes();
        },
        error: (error) => {
          console.error("Erro ao atualizar cliente:", error);
          alert("Erro ao atualizar cliente.");
        },
      });
  }

  LimparFormulario() {
    this.idClienteParaAtualizar = null;
    this.nomeCliente = "";
    this.emailCliente = "";
    this.numeroCliente = "";
    this.isEditMode = false;
  }

  DeletarCliente(id: string) {
    if (confirm(`Tem certeza que deseja excluir o cliente ${id}?`)) {
      this.http.post(`http://localhost:3000/clientes/${id}`, {}).subscribe({
        next: (response) => {
          alert("Cliente excluído com sucesso!");
          this.BuscarClientes();
        },
        error: (error) => {
          console.error("Erro ao excluir cliente:", error);
          alert(`Erro ao excluir o cliente: ${error}`);
        },
      });
    }
  }
}
