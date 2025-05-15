import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Provider } from "./provider";
import { PurchaseDetail } from "./purchaseDetail.entity";

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Provider, (provider: Provider) => provider.id)
  @JoinColumn({ name: "provider_id" })
  provider!: Provider;

  @Column({ type: "date", nullable: false })
  date!: Date;

  @Column({ type: "double", nullable: false })
  subtotal!: number;

  @Column({ type: "int", nullable: false })
  tax!: number;

  @Column({ type: "double", nullable: false })
  total!: number;

  @Column({ type: "text", nullable: true })
  notes!: string;
  @OneToMany(
    () => PurchaseDetail,
    (purchaseDetail: PurchaseDetail) => purchaseDetail.purchase,
    { cascade: true, onDelete: "CASCADE" }
  )
  @JoinColumn({ name: "purchasedetail_id" })
  purchaseDetails!: PurchaseDetail[];

  @CreateDateColumn({ type: "timestamp", nullable: true, select: false })
  createdAt!: Date;
}
