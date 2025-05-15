import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product.entity";
import { Purchase } from "./purchase.entity";

@Entity()
export class PurchaseDetail {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false, type: "int" })
  quantity!: number;

  @Column({ nullable: false, type: "double" })
  price!: number;

  @Column({ nullable: false, type: "double" })
  total!: number;

  @ManyToOne(() => Product, (product: Product) => product.id,{onDelete:'RESTRICT'})
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @ManyToOne(() => Purchase, (purchase: Purchase) => purchase.id)
  @JoinColumn({ name: "purchase_id" })
  purchase!: Purchase;

  
  @CreateDateColumn({ type: "timestamp", nullable: true, select: false })
  createdAt!: Date;
}
