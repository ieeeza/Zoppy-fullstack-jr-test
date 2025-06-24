import { ProdutosService } from "./../../service/produtosService/produtos-service";
import { PedidosService } from "./../../service/pedidosService/pedidos-service";
import { ClientesService } from "../../service/clientesService/clientes-service";
import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

interface Pedido {
  id?: string;
  clienteId: string;
  produto: string;
  descricao: string;
}

type PedidoInput = Omit<Pedido, "id">;

interface Cliente {
  id?: string;
  nome: string;
  email: string;
  numero: string;
}

interface Produto {
  id?: string;
  nome: string;
  preco: string;
  descricao: string;
}

@Component({
  selector: "app-pedidos-page",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./pedidos-page.html",
  styleUrl: "./pedidos-page.css",
})
export class PedidosPage implements OnInit {
  constructor(
    private readonly pedidosService: PedidosService,
    private readonly produtosService: ProdutosService,
    private readonly clientesService: ClientesService,
  ) {}

  listaDeCliente: Cliente[] = [];
  listaDeProduto: Produto[] = [];


  cliente: string = "";
  produto: string = "";
  descricao: string = "";

  ngOnInit(): void {
    this.buscarProdutos();
    this.buscarClientes();
  }

  limparFormulario() {
    this.cliente = "";
    this.produto = "";
    this.descricao = "";
  }

  verificarInputs(): boolean {
    const inputsFormatado: Pedido = {
      clienteId: this.cliente.trim(),
      produto: this.produto.trim(),
      descricao: this.descricao.trim(),
    };

    if (
      !inputsFormatado.clienteId ||
      !inputsFormatado.produto ||
      !inputsFormatado.descricao
    ) {
      alert("Preencha todos os campos, por favor!");
      return false;
    }

    return true;
  }

  realizarPedido(): void {
    const novoPedido: PedidoInput = {
      clienteId: this.cliente,
      produto: this.produto,
      descricao: this.descricao,
    };

    if (!this.verificarInputs()) {
      return;
    }

    this.pedidosService.cadastrarPedidos(novoPedido).subscribe({
      next: () => {
        alert("Pedido realizado com sucesso!");
        this.limparFormulario();
      },
      error: (error) => {
        console.error("Error ao realizar pedido.", error);
        alert(`Erro ao realizar pedido!. ${error.error.message}`);
      },
    });
  }

  buscarProdutos(): void {
    this.produtosService.getProdutos().subscribe({
      next: (data: Produto[]) => {
        this.listaDeProduto = data;
      },
      error: (error: any) => {
        console.error("Erro", error);
        alert(`Erro ao buscar produtos. ${error.error.message}`);
      },
    });
  }

  buscarClientes(): void {
    this.clientesService.getClientes().subscribe({
      next: (data: Cliente[]) => {
        this.listaDeCliente = data;
      },
      error: (error: any) => {
        alert("Erro ao carregar a lista de clientes.");
        console.error("Erro ao carregar lista de clientes.", error);
      },
    });
  }
}
