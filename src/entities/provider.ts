import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Provider {
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
}
