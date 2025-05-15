import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => Product, (product: Product) => product.id)
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @Column({ nullable: false, type: "int" })
  stock!: number;

  @CreateDateColumn({ type: "timestamp", nullable: true, select: true })
  createdAt!: Date;
}
