import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

interface Pedido {
  id: string;
  clienteEmail: string;
  produto: string;
  descricao: string;
}

interface Produto {
  id: string;
  nome: string;
  preco: number;
  descricao: string;
}

interface Cliente {
  id: string;
  nome: string;
  email: string;
  numero: string;
}

@Component({
  selector: "app-pedidos-page",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./pedidos-page.html",
  styleUrl: "./pedidos-page.css",
})
export class PedidosPage implements OnInit {
  constructor(private readonly http: HttpClient) {}

  listaDePedidos: Pedido[] = [];
  listaDeProdutos: Produto[] = [];
  listaDeClientes: Cliente[] = [];

  idPedidoParaAtualizar: string | null = null;
  cliente: string = "";
  produto: string = "";
  descricao: string = "";
  isEditMode: boolean = false;

  private readonly PEDIDOS_API_URL = `http://localhost:3000/pedidos`;
  private readonly PRODUTOS_API_URL = `http://localhost:3000/produtos`;
  private readonly CLIENTES_API_URL = `http://localhost:3000/clientes`;

  ngOnInit(): void {
    this.BuscarPedidos();
    this.BuscarProdutos();
    this.BuscarClientes();
  }

  BuscarProdutos() {
    this.http.get<Produto[]>(this.PRODUTOS_API_URL).subscribe({
      next: (data) => {
        this.listaDeProdutos = data;
      },
      error: (error) => {
        console.error("Erro ao carregar os produtos:", error);
        alert(`Erro ao carregar os produtos: ${error.message}`);
      },
    });
  }

  BuscarPedidos() {
    this.http.get<Pedido[]>(this.PEDIDOS_API_URL).subscribe({
      next: (data) => {
        this.listaDePedidos = data.map((pedido) => ({
          ...pedido,
        }));
      },
      error: (error) => {
        console.error("Erro ao carregar os pedidos:", error);
        alert(`Erro ao carregar os pedidos: ${error.message}`);
      },
    });
  }

  BuscarClientes() {
    this.http.get<Cliente[]>(this.CLIENTES_API_URL).subscribe({
      next: (data) => {
        this.listaDeClientes = data.map((cliente) => ({
          ...cliente,
        }));
      },
      error: (error) => {
        alert(`Erro ao carregar os clientes: ${error.message}`);
      },
    });
  }

  CarregarPedidoParaEdicao(id: string) {
    this.http.get<Pedido>(`${this.PEDIDOS_API_URL}/${id}`).subscribe({
      next: (response) => {
        this.idPedidoParaAtualizar = response.id;
        this.cliente = response.clienteEmail;
        this.produto = response.produto;
        this.descricao = response.descricao;
        this.isEditMode = true;
      },
      error: (error) => {
        console.error("Erro ao buscar o pedido para edição:", error);
        alert(`Erro ao buscar o pedido para edição: ${error.message}`);
      },
    });
  }

  CadastrarPedido() {
    console.log(this.cliente)
    console.log(this.produto)
    console.log(this.descricao)

    if (
      !this.cliente ||
      !this.produto ||
      !this.descricao
    ) {
      alert("Por favor, preencha todos os campos do pedido.");
      return;
    }

    const novoPedido = {
      clienteEmail: this.cliente,
      produto: this.produto,
      descricao: this.descricao,
    };

    this.http.post(this.PEDIDOS_API_URL, novoPedido).subscribe({
      next: (response) => {
        alert("Pedido cadastrado com sucesso!");
        this.LimparFormulario();
        this.BuscarPedidos();
      },
      error: (error) => {
        alert(`Erro ao cadastrar pedido: ${error.message}`);
      },
    });
  }

  SalvarAtualizacaoPedido() {
    if (!this.idPedidoParaAtualizar) {
      alert("Nenhum pedido selecionado para atualização.");
      return;
    }

    if (
      !this.cliente ||
      !this.produto ||
      !this.descricao
    ) {
      alert("Por favor, preencha todos os campos do pedido.");
      return;
    }

    const pedidoAtualizado = {
      id: this.idPedidoParaAtualizar,
      clienteEmail: this.cliente,
      produto: this.produto,
      descricao: this.descricao,
    };

    this.http
      .post(
        `${this.PEDIDOS_API_URL}/${this.idPedidoParaAtualizar}`,
        pedidoAtualizado,
      )
      .subscribe({
        next: (response) => {
          alert("Pedido atualizado com sucesso!");
          this.LimparFormulario();
          this.BuscarPedidos();
        },
        error: (error) => {
          alert(`Erro ao atualizar pedido: ${error.message}`);
        },
      });
  }

  LimparFormulario() {
    this.idPedidoParaAtualizar = null;
    this.cliente = "";
    this.produto = "";
    this.descricao = "";
    this.isEditMode = false;
  }

  DeletarPedido(id: string) {
    if (confirm(`Tem certeza que deseja excluir o pedido com ID: ${id}?`)) {
      this.http.post(`${this.PEDIDOS_API_URL}/deletar/${id}`, {}).subscribe({
        next: (response) => {
          alert("Pedido excluído com sucesso!");
          this.BuscarPedidos();
        },
        error: (error) => {
          alert(`Erro ao excluir o pedido: ${error.message}`);
        },
      });
    }
  }
}
