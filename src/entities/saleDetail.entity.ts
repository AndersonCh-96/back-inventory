import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product.entity";
import { Sale } from "./sale.entity";

@Entity()
export class SaleDetail {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false, type: "int" })
  quantity!: number;

  @Column({ nullable: false, type: "decimal" })
  unitCost!: number;

  @Column({ nullable: false, type: "decimal" })
  subtotal!: number;

  @Column({ nullable: false, type: "int" })
  taxPercentage!: number;

  @Column({ nullable: false, type: "int" })
  tax!: number;

  @CreateDateColumn({ nullable: false, type: "timestamp" })
  createdAt!: Date;

  @ManyToOne(() => Product, (product: Product) => product.saledetails, {
    nullable: false,
  })
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @ManyToOne(() => Sale, (sale: Sale) => sale.saleDetails)
  sale!: Sale;
}
