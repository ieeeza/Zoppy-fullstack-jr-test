import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

interface Produtos {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
}

@Injectable({
  providedIn: "root",
})
export class ProdutosService {
  private readonly apiUrlProdutos: string = "http://localhost:3000/produtos";

  constructor(private readonly http: HttpClient) {}

  cadastrarProdutos(Produtos: Produtos): Observable<Produtos> {
    return this.http.post<Produtos>(this.apiUrlProdutos, Produtos);
  }

  getProdutoss(): Observable<Produtos[]> {
    return this.http.get<Produtos[]>(this.apiUrlProdutos);
  }

  atualizarProdutos(id: string, Produtos: Produtos): Observable<Produtos> {
    return this.http.post<Produtos>(`${this.apiUrlProdutos}/${id}`, Produtos);
  }

  deletarProdutos(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrlProdutos}/deletar/${id}`, {});
  }
}
