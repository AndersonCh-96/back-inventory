import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from "typeorm";
import { Purchase } from "../entities/purchase.entity";
import Container from "typedi";
import InventoryService from "../services/inventory.service";


@EventSubscriber()
export class PurchaseSubscriber implements EntitySubscriberInterface<Purchase> {
  listenTo() {
    return Purchase;
  }

  // afterInsert(event: InsertEvent<Purchase>): Promise<any> | void {
  //   const entity = event.entity;
  //   const inventoryService = Container.get(InventoryService);
  //   inventoryService.registerPurchase(entity)
  
  // }
}
