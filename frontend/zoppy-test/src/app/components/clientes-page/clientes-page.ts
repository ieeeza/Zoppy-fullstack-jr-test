import { Component, OnInit } from "@angular/core";
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
export class ClientesPage implements OnInit {
  constructor(private readonly http: HttpClient) {}

  listaDeClientes: Cliente[] = [];
  idClienteParaAtualizar: string | null = null;
  emailCliente: string = "";
  nomeCliente: string = "";
  numeroCliente: string = "";
  isEditMode: boolean = false;

  ngOnInit(): void {
    this.BuscarClientes();
  }

  BuscarClientes() {
    this.http.get<Cliente[]>("http://localhost:3000/clientes").subscribe({
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
      this.http
        .post(`http://localhost:3000/clientes/deletar/${id}`, {})
        .subscribe({
          next: (response) => {
            alert("Cliente excluído com sucesso!");
            this.BuscarClientes();
            this.LimparFormulario();
          },
          error: (error) => {
            alert(`Erro ao excluir o cliente: ${error}`);
          },
        });
    }
  }
}
