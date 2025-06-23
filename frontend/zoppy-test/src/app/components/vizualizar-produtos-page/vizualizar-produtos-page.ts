import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ProdutosService } from "../../service/produtosService/produtos-service";

interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
}

@Component({
  selector: "app-vizualizar-produtos-page",
  imports: [CommonModule],
  templateUrl: "./vizualizar-produtos-page.html",
  styleUrl: "./vizualizar-produtos-page.css",
})
export class VizualizarProdutosPage implements OnInit {
  constructor(private readonly produtosService: ProdutosService) {}

  listaDeProdutos: Produto[] = [];

  ngOnInit(): void {
    this.buscarProduto();
  }

  mostrarModalEditar: boolean = false;
  produtoSelecionado: Produto = { id: "", nome: "", descricao: "", preco: "" };

  buscarProduto(): void {
    this.produtosService.getProdutos().subscribe({
      next: (data: Produto[]) => {
        this.listaDeProdutos = data;
      },
      error: (error: any) => {
        console.error("Erro", error);
        alert(`Erro ao buscar produtos. ${error.error.message}`);
      },
    });
  }
}
