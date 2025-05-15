import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "./post.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false, type: "text" })
  name!: string;

  @Column({ nullable: false, type: "text" })
  phone!: string;

  @Column({
    type: "varchar",
    length: 255,
    unique: true,
  })
  email!: string;

  @Column({ nullable: false })
  password!: string;
  @CreateDateColumn({ type: "timestamp", nullable: false, select: false })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true, select: false })
  updatedAt!: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deletedAt!: Date;

  // @OneToMany(() => Post, (post) => post.user)
  // posts?: Post[];
}
