import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProdutosController } from "./produtos.controller";
import { ProdutosService } from "./produtos.service";
import { Produto } from "src/entities/produto.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Produto])],
  controllers: [ProdutosController],
  providers: [ProdutosService],
})
export class ProdutosModule {}
