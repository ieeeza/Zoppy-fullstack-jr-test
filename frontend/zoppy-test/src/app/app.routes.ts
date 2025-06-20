import { RouterModule, Routes } from "@angular/router";
import { ClientesPage } from "./components/clientes-page/clientes-page";
import { PedidosPage } from "./components/pedidos-page/pedidos-page";
import { ProdutosPage } from "./components/produtos-page/produtos-page";
import { LandingPage } from "./components/landing-page/landing-page";
import { NgModule } from "@angular/core";

export const routes: Routes = [
  {
    path: "",
    component: LandingPage,
  },
  {
    path: "clientes",
    component: ClientesPage,
  },
  {
    path: "pedidos",
    component: PedidosPage,
  },
  {
    path: "produtos",
    component: ProdutosPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
