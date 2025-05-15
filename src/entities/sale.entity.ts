import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Customer } from "./customer.entity";
import { SaleDetail } from "./saleDetail.entity";
import { Payment } from "./payment.entity";
import { Credit } from "./credits.entity";

@Entity()
export class Sale {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false, type: "double" })
  subtotal!: number;

  @Column({ nullable: false, type: "double" })
  total!: number;

  @Column({ nullable: false, type: "double" })
  tax!: number;

  @Column({ nullable: false, type: "text" })
  date!: string;
  @Column({ nullable: false, type: "text" })
  notes!: string;

  @ManyToOne(() => Customer, (customer: Customer) => customer.id)
  @JoinColumn({ name: "customer_id" })
  customer!: Customer;

  @OneToMany(() => SaleDetail, (saledetail: SaleDetail) => saledetail.sale, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "saledetail_id" })
  saleDetails!: SaleDetail[];

  @OneToMany(() => Payment, (payment: Payment) => payment.sale, {
    cascade: true,
  })
  payments!: Payment[];

  @OneToMany(() => Credit, (credit: Credit) => credit.sale, {
    cascade: true,
  })
  credits!: Credit[];
}
