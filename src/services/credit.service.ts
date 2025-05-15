import { creditRepository } from "./../repositories/credit.repository";
import { Service } from "typedi";

import { customerRepository } from "../repositories/customer.repository";

@Service()
export class CreditService {
  async getAllCredits() {
    return await customerRepository.find({
      where: { credit: { status: "Active" } },
      relations: ["credit"],
      order: { credit: { createdAt: "ASC" } },
    });

    //   return await creditRepository.find({ relations: ["customer"] });
  }
  async getAllCreditsByCustomer(customerId: string) {
    const findCustomer = await customerRepository.findOne({
      where: { id: customerId, credit: { status: "Active" } },
      relations: ["credit"],
      order: { credit: { createdAt: "DESC" } },
    });

    if (!findCustomer) {
      throw new Error("Cliente no encontrado");
    }

    // console.log("FIndd", findCustomer);

    // const creditsByCustomers = await creditRepository.find({
    //   where: { customer: { id: findCustomer.id }, status: "Active" },
    //   relations: ["customer"],
    // });

    return findCustomer;
  }

  async totalCredits() {
    const totalCredit = await creditRepository
      .createQueryBuilder("credit")
      .select("SUM(credit.dueAmount)", "total")
      .getRawOne();
    return totalCredit.total;
  }
}
