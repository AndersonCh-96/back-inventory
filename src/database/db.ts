import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";
import { Post } from "../entities/post.entity";
import { Product } from "../entities/product.entity";
import { Customer } from "../entities/customer.entity";
import { SaleDetail } from "../entities/saleDetail.entity";
import { Sale } from "../entities/sale.entity";
import { Payment } from "../entities/payment.entity";
import { Credit } from "../entities/credits.entity";
import { Provider } from "../entities/provider";
import { Purchase } from "../entities/purchase.entity";
import { PurchaseDetail } from "../entities/purchaseDetail.entity";
import { PurchaseSubscriber } from "../subscribers/purchase.subscriber";
import { Inventory } from "../entities/inventory.entity";
import { SaleSubscriber } from "../subscribers/sale.subscriber";
import { InventoryMovement } from "../entities/inventoryMovements.entity";
import dotenv from "dotenv";

dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASEURL,
  // host: "localhost",
  // port: 5432,
  // username: "postgres",
  // password: "root",
  // database: "inventory",

  ssl: false,
  synchronize: true,
  logging: ["error"],
  entities: [
    User,
    Product,
    Customer,
    SaleDetail,
    Sale,
    Payment,
    Credit,
    Provider,
    Purchase,
    PurchaseDetail,
    Inventory,
    InventoryMovement,
  ],

  migrations: [],
  subscribers: [PurchaseSubscriber, SaleSubscriber],
});

export default AppDataSource;
