import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Product } from "./product.entity";

export enum Type {
  Entry = "entry",
  Exit = "exit",
  Adjustment = "adjustment",
}

@Entity()
export class InventoryMovement {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column({ nullable: true, type: "enum", enum: Type })
  type?: Type;

  @Column({ nullable: true, type: "int" })
  quantity?: number;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn()
  product?: Product;

  @Column({ nullable: false, type: "text" })
  note?: string;

  @CreateDateColumn({ type: "timestamp", nullable: true, select: true })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true, select: false })
  updatedAt!: Date;
}
