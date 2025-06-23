import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

interface Cliente {
  id: string;
  nome: string;
  email: string;
  numero: string;
}

@Component({
  selector: "app-clientes-page",
  imports: [CommonModule, FormsModule, RouterLink],
  standalone: true,
  templateUrl: "./clientes-page.html",
  styleUrls: ["./clientes-page.css"],
})
export class ClientesPage {
  constructor(private readonly http: HttpClient) {}

  listaDeClientes: Cliente[] = [];
  idClienteParaAtualizar: string | null = null;
  emailCliente: string = "";
  nomeCliente: string = "";
  numeroCliente: string = "";

  LimparFormulario() {
    this.idClienteParaAtualizar = null;
    this.nomeCliente = "";
    this.emailCliente = "";
    this.numeroCliente = "";
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
      },
      error: (error) => {
        console.error("Erro ao cadastrar cliente:", error);
        alert("Erro ao cadastrar cliente.");
      },
    });
  }
}
