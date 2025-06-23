import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ClientesService } from "../../service/clientesService/clientes-service";

interface Cliente {
  id: string;
  nome: string;
  email: string;
  numero: string;
}

@Component({
  selector: "app-vizualizar-clientes-page",
  imports: [RouterLink, CommonModule],
  templateUrl: "./vizualizar-clientes-page.html",
  styleUrl: "./vizualizar-clientes-page.css",
})
export class VizualizarClientesPage implements OnInit {
  listaDeClientes: Cliente[] = [];
  errorMessage: string = "";

  constructor(private readonly clientesService: ClientesService) {}

  ngOnInit(): void {
    this.buscarClientes();
  }

  buscarClientes(): void {
    this.clientesService.getClientes().subscribe({
      next: (data: Cliente[]) => {
        this.listaDeClientes = data;
        this.errorMessage = "";
      },
      error: (error: any) => {
        console.error("Erro ao carregar clientes:", error);
        this.errorMessage =
          "Não foi possivel carregar os clientes, tente novemante mais tarde!";
      },
    });
  }
}
