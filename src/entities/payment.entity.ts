import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Sale } from "./sale.entity";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false, type: "enum", enum: ["Cash", "Transfer"] })
  type!: string;

  @Column({ nullable: false, type: "double" })
  amount!: number;

  @Column({ type: "varchar", length: 36, nullable: true })
  accountNumber!: string;

  @Column({ type: "varchar", length: 36, nullable: true })
  receiptNumber!: string;

  @CreateDateColumn({ type: "timestamp", nullable: true, select: false })
  createdAt!: Date;
  @ManyToOne(() => Sale, (sale: Sale) => sale.id, {
    nullable: true,
  })
  @JoinColumn({ name: "sale_id" })
  sale!: Sale;
}
