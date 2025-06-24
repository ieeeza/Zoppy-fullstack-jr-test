import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Cliente } from "./cliente.entity";

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  produto: string;

  @Column()
  descricao: string;

  @ManyToOne(() => Cliente, { eager: false })
  @JoinColumn({ name: "clienteId" })
  cliente: Cliente;
}
