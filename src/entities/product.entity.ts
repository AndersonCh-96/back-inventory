import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SaleDetail } from "./saleDetail.entity";
import { Inventory } from "./inventory.entity";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  @Column({ nullable: false, type: "text" })
  name!: string;

  @Column({ nullable: false, type: "varchar", unique: true, length:255 })
  code!: string;

  @Column({ nullable: false, type: "decimal" })
  price!: number;

  @Column({ nullable: false, type: "int" })
  tax!: number;

  @Column({ nullable: true, type: "text" })
  brand?: string;

  @Column({ nullable: true, type: "text" })
  image?: string;

  @CreateDateColumn({ nullable: false, type: "timestamp" })
  createAt!: Date;
  @DeleteDateColumn({ nullable: false, type: "timestamp" })
  deleteAt!: Date;

  @OneToMany(() => SaleDetail, (saleDetail: SaleDetail) => saleDetail.product, {
    nullable: false,
    onDelete: "RESTRICT",
  })
  saledetails!: SaleDetail[];

  @OneToOne(() => Inventory, (inventory) => inventory.product)
  inventory!: Inventory;
}
