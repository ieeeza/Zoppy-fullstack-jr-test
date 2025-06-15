import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Produtos")
export class Produto {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  nome: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  descricao: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  preco: string;
}
