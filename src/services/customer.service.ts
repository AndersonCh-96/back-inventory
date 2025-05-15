import { Service } from "typedi";
import { customerRepository } from "../repositories/customer.repository";

@Service()
export class CustomerService {
  async getAllCustomer() {
    return await customerRepository.find();
  }

  async createCustomer(customer: any) {
    return await customerRepository.save(customer);
  }

  async updateCustomer(id: string, customer: any) {
    const findCustomer = await customerRepository.findOne({
      where: { id: id },
    });

    if (!findCustomer) {
      throw new Error("Cliente no encontrado!");
    }
    await customerRepository.update(findCustomer.id, customer);
    return findCustomer;
  }

  async deleteCustomer(id: string) {
    const findCustomer = await customerRepository.findOne({
      where: { id: id },
    });

    if (!findCustomer) {
      throw new Error("Cliente no encontrado!");
    }

    return await customerRepository.delete(findCustomer.id);
  }
}
