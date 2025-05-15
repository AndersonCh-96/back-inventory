import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false, type: "text" })
  title!: string;

  @Column({ nullable: false, type: "text" })
  content!: string;

  // @ManyToOne(()=>User, (user) =>user.posts)
  // user!:User;
}
