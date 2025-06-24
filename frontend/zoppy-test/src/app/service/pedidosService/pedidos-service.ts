import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

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

type PedidoInput = Omit<Pedido, "id" | "cliente"> & { clienteId: string };

@Injectable({
  providedIn: "root",
})
export class PedidosService {
  private readonly apiUrlPedidos = `http://localhost:3000/pedidos`;

  constructor(private readonly http: HttpClient) {}

  cadastrarPedidos(pedido: PedidoInput): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrlPedidos, pedido);
  }
  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrlPedidos);
  }

  atualizarPedidos(id: string, pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.apiUrlPedidos}/${id}`, pedido);
  }

  deletarPedidos(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrlPedidos}/deletar/${id}`, {});
  }
}
