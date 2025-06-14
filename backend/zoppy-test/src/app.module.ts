import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientesModule } from "./clientes/clientes.module";
import { PedidosModule } from "./pedidos/pedidos.module";
import { ProdutosModule } from "./produtos/produtos.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "Cesar1234.",
      database: "zoppy",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    ClientesModule,
    PedidosModule,
    ProdutosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
