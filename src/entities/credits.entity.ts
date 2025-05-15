import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Sale } from "./sale.entity";
import { Customer } from "./customer.entity";

@Entity()
export class Credit {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @ManyToOne(() => Sale, (sale: Sale) => sale.id, {
    nullable: false,
  })
  @JoinColumn({ name: "sale_id" })
  sale!: Sale;

  @ManyToOne(() => Customer, (customer: Customer) => customer.id, {
    nullable: false,
  })
  @JoinColumn({ name: "customer_id" })
  customer!: Customer;

  @Column({ type: "int", nullable: false })
  totalAmount!: number;

  @Column({ type: "int", nullable: false })
  dueAmount!: number;

  @Column({ type: "int", nullable: false, default: 0 })
  paidAmount!: number;

  @Column({ type: "date", nullable: true })
  dueDate!: Date;

  @Column({
    type: "enum",
    enum: ["Active", "Paid"],
    nullable: false,
    default: "Active",
  })
  status!: string;

  @CreateDateColumn({ type: "timestamp", nullable: true, select: true })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true, select: false })
  updatedAt!: Date;
}
