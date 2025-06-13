import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cliente } from "./entities/cliente.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "Cesar1234.",
      database: "zoppy",
      entities: [Cliente],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Cliente]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
