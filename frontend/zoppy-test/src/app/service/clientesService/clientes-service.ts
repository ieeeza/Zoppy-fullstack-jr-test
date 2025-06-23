import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Cliente {
  id: string;
  nome: string;
  email: string;
  numero: string;
}

@Injectable({
  providedIn: "root",
})
export class ClientesService {
  private readonly apiUrlClientes: string = "http://localhost:3000/clientes";

  constructor(private readonly http: HttpClient) {}

  cadastrarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrlClientes, cliente);
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrlClientes);
  }

  atualizarCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrlClientes}/${id}`, cliente);
  }

  deletarCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlClientes}/${id}`);
  }
}
