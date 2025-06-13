import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("clientes")
export class Cliente {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  nome: string;

  @Column({ type: "varchar", length: 255, unique: true, nullable: false })
  email: string;

  @Column({ type: "varchar", length: 255, unique: true, nullable: false })
  numero: string;
}
