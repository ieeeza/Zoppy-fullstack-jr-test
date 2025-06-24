import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { PedidosService } from "../../service/pedidosService/pedidos-service";

interface Cliente {
  id: string;
  nome: string;
  email: string;
  numero: string;
}

interface Pedido {
  id: string;
  cliente: Cliente;
  produto: string;
  descricao: string;
}

@Component({
  selector: "app-vizualizar-pedidos-page",
  imports: [RouterLink, CommonModule],
  templateUrl: "./vizualizar-pedidos-page.html",
  styleUrl: "./vizualizar-pedidos-page.css",
})
export class VizualizarPedidosPage implements OnInit {
  listaDePedidos: Pedido[] = [];

  constructor(private readonly pedidosService: PedidosService) {}

  mostrarModalEditar: boolean = false;
  pedidoSelecionado: Cliente = { id: "", nome: "", email: "", numero: "" };

  ngOnInit(): void {
    this.buscarPedidos();
  }

  buscarPedidos(): void {
    this.pedidosService.getPedidos().subscribe({
      next: (data: Pedido[]) => {
        this.listaDePedidos = data;
      },
      error: (error: any) => {
        alert("Erro ao buscar pedidos ativos!");
        console.error("Erro:", error);
      },
    });
  }

  deletarPedido(id: string): void {
    this.pedidosService.deletarPedidos(id).subscribe({
      next: () => {
        alert("Pedido deletado com sucesso!");
      },
      error: (error: any) => {
        console.error("Erro ao deletar Pedido:", error);
        alert(`Erro ao deletar Pedido.`);
      },
      complete: () => {
        this.buscarPedidos();
      },
    });
  }
}
