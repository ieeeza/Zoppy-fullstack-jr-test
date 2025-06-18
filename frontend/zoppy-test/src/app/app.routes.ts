import { RouterModule, Routes } from "@angular/router";
import { ClientesPage } from "./components/clientes-page/clientes-page";
import { PedidosPage } from "./components/pedidos-page/pedidos-page";
import { ProdutosPage } from "./components/produtos-page/produtos-page";
import { LandingPage } from "./components/landing-page/landing-page";
import { NgModule } from "@angular/core";
import { VizualizarClientesPage } from "./components/vizualizar-clientes-page/vizualizar-clientes-page";
import { VizualizarPedidosPage } from "./components/vizualizar-pedidos-page/vizualizar-pedidos-page";
import { VizualizarProdutosPage } from "./components/vizualizar-produtos-page/vizualizar-produtos-page";

export const routes: Routes = [
  {
    path: "",
    component: LandingPage,
  },
  {
    path: "clientes/cadastrar",
    component: ClientesPage,
  },
  {
    path: "clientes/vizualizar",
    component: VizualizarClientesPage,
  },
  {
    path: "pedidos/cadastrar",
    component: PedidosPage,
  },
  {
    path: "pedidos/ativos",
    component: VizualizarPedidosPage,
  },
  {
    path: "produtos/cadastrar",
    component: ProdutosPage,
  },
  {
    path: "produtos/vizualizar",
    component: VizualizarProdutosPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
