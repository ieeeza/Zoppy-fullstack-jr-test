import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
}

type ProdutoInput = Omit<Produto, "id">;

@Injectable({
  providedIn: "root",
})
export class ProdutosService {
  private readonly apiUrlProdutos: string = "http://localhost:3000/produtos";

  constructor(private readonly http: HttpClient) {}

  cadastrarProdutos(Produto: ProdutoInput): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrlProdutos, Produto);
  }

  getProdutoss(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrlProdutos);
  }

  atualizarProdutos(id: string, Produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${this.apiUrlProdutos}/${id}`, Produto);
  }

  deletarProdutos(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrlProdutos}/deletar/${id}`, {});
  }
}
