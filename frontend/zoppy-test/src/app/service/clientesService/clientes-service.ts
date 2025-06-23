import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Cliente {
  id: string;
  nome: string;
  email: string;
  numero: string;
}

type ClienteInput = Omit<Cliente, "id">;

@Injectable({
  providedIn: "root",
})
export class ClientesService {
  private readonly apiUrlClientes: string = "http://localhost:3000/clientes";

  constructor(private readonly http: HttpClient) {}

  cadastrarCliente(cliente: ClienteInput): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrlClientes, cliente);
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrlClientes);
  }

  atualizarCliente(id: string, cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrlClientes}/${id}`, cliente);
  }

  deletarCliente(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrlClientes}/deletar/${id}`, {});
  }
}
