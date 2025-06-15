import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

interface Cliente {
  id: string;
  nome: string;
}

@Component({
  selector: "app-clientes-page",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./clientes-page.html",
  styleUrls: ["./clientes-page.css"],
})
export class ClientesPage implements OnInit {
  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.BuscarClientes();
  }

  nomeCliente: string = "";
  emailCliente: string = "";
  numeroCliente: string = "";
  listaDeClientes: Cliente[] = [];

  BuscarClientes() {
    this.http.get<Cliente[]>("http://localhost:3000/clientes").subscribe({
      next: (data: Cliente[]) => {
        this.listaDeClientes = data;
      },
      error: (error) => {
        alert(`Error ao buscar lista de clientes: ${error}`);
      },
    });
  }

  AtualizarCliente() {
    
    

    this.http.get(`http://localhost:3000/clientes`).subscribe({
      next: () => {
        alert(`Cliente atualizado com sucesso!`);
      },
      error: (error) => {
        alert(`Error ao atualizar o cliente: ${error}`);
      },
    });
  }

  CadastrarCliente() {
    const clienteData = {
      nome: this.nomeCliente,
      email: this.emailCliente,
      numero: this.numeroCliente,
    };

    if (!this.nomeCliente || !this.emailCliente || !this.numeroCliente) {
      alert("Preencha os campos");
      return;
    }

    this.http.post("http://localhost:3000/clientes", clienteData).subscribe({
      next: () => {
        this.nomeCliente = "";
        this.emailCliente = "";
        this.numeroCliente = "";
      },
      error: (error) => {
        alert("Erro ao cadastrar cliente: " + error.message);
      },
      complete: () => {
        alert("Cliente cadastrado com sucesso!");
        this.BuscarClientes();
      },
    });
  }

  confirmarDelecao(id: string, nomeCliente: string) {
    if (confirm(`Tem certeza que deseja excluir o cliente ${nomeCliente}?`)) {
      this.DeletarCliente(id);
    }
  }

  DeletarCliente(id: string) {
    this.http.post(`http://localhost:3000/clientes/deletar/${id}`, {}).subscribe({
      next: (response) => {
        alert(`Cliente excluído com sucesso!`);
        this.BuscarClientes();
      },
      error: (error) => {
        alert(`Error ao excluir o cliente: ${error}`);
      },
    });
  }
}
