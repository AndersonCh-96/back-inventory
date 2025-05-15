import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from "typeorm";
import { Sale } from "../entities/sale.entity";
import Container from "typedi";
import InventoryService from "../services/inventory.service";

@EventSubscriber()
export class SaleSubscriber implements EntitySubscriberInterface<Sale> {
  listenTo() {
    return Sale;
  }

  // afterInsert(event: InsertEvent<Sale>): Promise<any> | void {
  //   const entity = event.entity;
  //   const inventoryService = Container.get(InventoryService);
  //   inventoryService.registerSaleInventory(entity);
  // }
}
