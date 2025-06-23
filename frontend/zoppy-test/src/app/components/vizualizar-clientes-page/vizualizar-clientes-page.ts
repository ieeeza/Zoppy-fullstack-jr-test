import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ClientesService } from "../../service/clientesService/clientes-service";
import { ModalEditarComponent } from "../shared/modal-editar-cliente/modal-editar-cliente";

interface Cliente {
  id: string;
  nome: string;
  email: string;
  numero: string;
}

@Component({
  selector: "app-vizualizar-clientes-page",
  imports: [RouterLink, CommonModule, ModalEditarComponent],
  templateUrl: "./vizualizar-clientes-page.html",
  styleUrl: "./vizualizar-clientes-page.css",
})
export class VizualizarClientesPage implements OnInit {
  listaDeClientes: Cliente[] = [];

  constructor(private readonly clientesService: ClientesService) {}

  mostrarModalEditar: boolean = false;
  clienteSelecionado: Cliente = { id: "", nome: "", email: "", numero: "" };

  ngOnInit(): void {
    this.buscarClientes();
  }

  buscarClientes(): void {
    this.clientesService.getClientes().subscribe({
      next: (data: Cliente[]) => {
        this.listaDeClientes = data;
      },
      error: (error: any) => {
        console.error("Erro ao carregar clientes:", error);
        alert(`Erro ao tentar carregar clientes. ${error.message}`);
      },
    });
  }

  deletarClientes(id: string): void {
    this.clientesService.deletarCliente(id).subscribe({
      next: () => {
        alert("Cliente deletado com sucesso!");
      },
      error: (error: any) => {
        console.error("Erro ao deletar cliente:", error);
        alert(`Erro ao deletar cliente.`);
      },
      complete: () => {
        this.buscarClientes();
      },
    });
  }

  salvarModal(dados: { nome: string; email: string; numero: string }) {
    const clienteEditado: Cliente = {
      ...this.clienteSelecionado,
      ...dados,
    };

    this.salvarClienteEditado(clienteEditado);
  }

  salvarClienteEditado(cliente: Cliente): void {
    this.clientesService.atualizarCliente(cliente.id, cliente).subscribe({
      next: () => {
        alert("Cliente atualizado com sucesso!");
        this.buscarClientes();
        this.mostrarModalEditar = false;
      },
      error: (error) => {
        console.error("Erro ao atualizar cliente:", error);
        alert(`Erro ao atualizar cliente. ${error.error.message}`);
      },
    });
  }

  abrirModalEditar(cliente: Cliente) {
    this.clienteSelecionado = { ...cliente };
    this.mostrarModalEditar = true;
  }
}
