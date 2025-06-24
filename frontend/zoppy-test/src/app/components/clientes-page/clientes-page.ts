import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { ClientesService } from "../../service/clientesService/clientes-service";

interface Cliente {
  id?: string;
  nome: string;
  email: string;
  numero: string;
}

type ClienteInput = Omit<Cliente, "id">;

@Component({
  selector: "app-clientes-page",
  imports: [CommonModule, FormsModule, RouterLink],
  standalone: true,
  templateUrl: "./clientes-page.html",
  styleUrls: ["./clientes-page.css"],
})
export class ClientesPage {
  constructor(private readonly clientesService: ClientesService) {}

  emailCliente: string = "";
  nomeCliente: string = "";
  numeroCliente: string = "";

  limparFormulario() {
    this.nomeCliente = "";
    this.emailCliente = "";
    this.numeroCliente = "";
  }

  verificarInputs(): boolean {
    const inputsFormatado: Cliente = {
      nome: this.nomeCliente.trim(),
      email: this.emailCliente.trim(),
      numero: this.numeroCliente.trim(),
    };

    if (
      !inputsFormatado.nome ||
      !inputsFormatado.email ||
      !inputsFormatado.numero
    ) {
      alert("Preencha todos os campos, por favor!");
      return false;
    } else if (inputsFormatado.nome.length < 10) {
      alert("Digite o nome completo");
      return false;
    } else if (
      !inputsFormatado.email.includes("@") ||
      !inputsFormatado.email.includes(".com")
    ) {
      alert("Digite um email válido!");
      return false;
    }

    return true;
  }

  permitirNumeros(event: KeyboardEvent) {
    const char = event.key;

    if (!/^\d$/.test(char)) {
      event.preventDefault();
    }
  }

  bloquearTextoInvalido(event: ClipboardEvent) {
    const texto = event.clipboardData?.getData("text") ?? "";

    if (!/^\d*$/.test(texto)) {
      event.preventDefault();
    }
  }

  cadastrarCliente(): void {
    const novoCliente: ClienteInput = {
      nome: this.nomeCliente,
      email: this.emailCliente,
      numero: this.numeroCliente,
    };

    if (!this.verificarInputs()) {
      return;
    }

    this.clientesService.cadastrarCliente(novoCliente).subscribe({
      next: () => {
        alert("Cliente cadastrado com sucesso!");
        this.limparFormulario();
      },
      error: (error) => {
        console.error("Error ao cadastrar cliente.", error);
        alert(`Erro ao cadastrar cliente!. ${error.error.message}`);
      },
    });
  }
}
