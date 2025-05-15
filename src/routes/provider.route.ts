import express from "express";
import Container from "typedi";
import { ProviderController } from "../controllers/provider.controller";

export const provider_route = express.Router();

const providerController = Container.get(ProviderController);

provider_route.get(
  "/",
  providerController.getAllProvider.bind(providerController)
);

provider_route.post(
  "/create",
  providerController.createProvider.bind(providerController)
);

provider_route.put(
  "/:id",
  providerController.updateProvider.bind(providerController)
);

provider_route.delete(
  "/:id",
  providerController.deleteProvider.bind(providerController)
);
