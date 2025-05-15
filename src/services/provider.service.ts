import { Service } from "typedi";
import { providerRepository } from "../repositories/provider.repository";

@Service()
export class ProviderService {
  async getAllProvider() {
    const data = await providerRepository.find();

    return data;
  }

  async createProvider(provider: any) {
    return await providerRepository.save(provider);
  }

  async updateProvider(id: string, provider: any) {
    const findProvider = await providerRepository.findOne({
      where: { id: id },
    });

    if (!findProvider) {
      throw new Error("Proveedor no encontrado!");
    }
    await providerRepository.update(findProvider.id, provider);
    return findProvider;
  }

  async deleteProvider(id: string) {
    const findProvider = await providerRepository.findOne({
      where: { id: id },
    });

    if (!findProvider) {
      throw new Error("Proveedor no encontrado!");
    }

    return await providerRepository.delete(findProvider.id);
  }
}
