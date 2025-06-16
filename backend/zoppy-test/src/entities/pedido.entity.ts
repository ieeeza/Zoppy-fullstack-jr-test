import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Pedidos")
export class Pedido {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  clienteEmail: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  produto: string;

  @Column({ type: "text", nullable: true })
  descricao: string;
}
