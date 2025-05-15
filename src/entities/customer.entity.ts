import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Credit } from "./credits.entity";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false, type: "text" })
  name!: string;

  @Column({ nullable: false, type: "text" })
  lastName!: string;

  @Column({ nullable: false, type: "text" })
  phone!: string;

  @Column({ nullable: false, type: "text" })
  email!: string;

  @CreateDateColumn({ nullable: false, type: "timestamp" })
  createAt!: Date;

  @DeleteDateColumn({ nullable: false, type: "timestamp" })
  deleteAt!: Date;

  @OneToMany(() => Credit, (credit: Credit) => credit.customer)
  credit!: Credit;
}
