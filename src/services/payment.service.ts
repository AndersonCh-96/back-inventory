import { Service } from "typedi";
import { customerRepository } from "../repositories/customer.repository";
import { creditRepository } from "../repositories/credit.repository";
import { paymentRepository } from "../repositories/payment.repository";

@Service()
export class PaymentService {
  async createPayment(payment: any) {
    const { customer, paymentMethods } = payment;

    const creditByCustomer = await creditRepository.find({
      where: { customer: { id: customer }, status: "Active" },
      order: { createdAt: "ASC" },
      relations: ["sale"],
    });

    if (creditByCustomer.length == 0) {
      throw new Error("El cliente no tiene creditos");
    }

    const entryAmountSum: number = paymentMethods.reduce(
      (acum: number, item: any) => {
        return acum + parseFloat(item.amount);
      },
      0
    );

    let totalRemaining = entryAmountSum;
    for (const itemCredit of creditByCustomer) {
      //Revisar el total remaing
      if (totalRemaining <= 0) break;

      const remainingDue = itemCredit.dueAmount;
      if (entryAmountSum > itemCredit.dueAmount) {
        throw new Error("El monto que intenta ingresar es superior a la deuda");
      }
      if (totalRemaining >= remainingDue) {
        itemCredit.paidAmount += remainingDue;
        totalRemaining -= remainingDue;
        itemCredit.dueAmount = 0;
        itemCredit.status = "Paid";
      } else {
        itemCredit.paidAmount += totalRemaining;
        itemCredit.dueAmount -= totalRemaining;
        totalRemaining = 0;
        if (itemCredit.dueAmount === 0) {
          itemCredit.status = "Paid";
        }
      }

      await creditRepository.save(itemCredit);
      const total = 0;

      for (const data of paymentMethods) {
        const newObjetPayment = {
          customer: customer,
          amount: data.amount,
          sale: itemCredit.sale,
          type: data.type === "Cash" ? "Cash" : "Transfer",
          accountNumber: data.type === "Transfer" ? data.accountNumber : null,
          receiptNumber: data.type === "Transfer" ? data.receiptNumber : null,
        };

        await paymentRepository.save(newObjetPayment);
      }
    }

    const data = await customerRepository.findOne({
      where: { credit: { status: "Active" }, id: customer.id },
      relations: ["credit"],
    });

    return data;
  }
}
