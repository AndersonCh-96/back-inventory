import express from "express";
import { user_router } from "./routes/user.route";
const app = express();
import AppDataSource from "./database/db";
import { post_router } from "./routes/post.route";
import { auth_route } from "./routes/auth.route";
import dotenv from "dotenv";
import cors from "cors";
import { product_route } from "./routes/product.route";
import { customer_route } from "./routes/customer.route";
import { sale_route } from "./routes/sale.route";
import { route_credit } from "./routes/credit.route";
import { payment_route } from "./routes/payment.route";
import { provider_route } from "./routes/provider.route";
import { route_purchase } from "./routes/purchase.route";
import { route_inventory } from "./routes/inventory.route";
import path from "path";
import { route_inventoryMovements } from "./routes/inventroyMovements.route";

dotenv.config();
AppDataSource.initialize();

app.use(express.json());
app.use(cors());

app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "public/uploads"))
);

app.use("/api/user", user_router);
app.use("/api/post", post_router);
app.use("/api/products", product_route);
app.use("/api/customer", customer_route);
app.use("/api/user/verify", auth_route);
app.use("/api/sales", sale_route);
app.use("/api/credits", route_credit);
app.use("/api/payment", payment_route);
app.use("/api/provider", provider_route);
app.use("/api/purchase", route_purchase);
app.use("/api/inventory", route_inventory);
app.use("/api/inventory-movements", route_inventoryMovements);
app.listen(process.env.PORT, () => {
  console.log(`Server run on port ${process.env.PORT}`);
});
