import { userRepository } from "./../repositories/user.repository";
import { Service } from "typedi";
import { User } from "../entities/user.entity";
import bcrypt from "bcryptjs";

@Service()
export class UserService {
  async getAllUser() {
    return await userRepository.find({});
  }

  async getOneUser(user: string) {
    const userOne = await userRepository.findOne({ where: { id: user } });
    if (!userOne) {
      throw new Error("User not found");
    }
    return userOne;
  }

  async createUser(user: User) {
    const findUser = await userRepository.findOne({
      where: { email: user.email },
    });
    if (findUser) {
      throw new Error("Correo electronico ya registrado!");
    }
    const encryptPass = await bcrypt.hash(user.password, 10);
    const newUser = { ...user, password: encryptPass };
    return userRepository.save(newUser);
  }

  async updateUser(id: string, user: User) {
    const findUser = await userRepository.findOne({ where: { id: id } });
    if (!findUser) {
      throw new Error("User not found");
    }
    const encryptPass = await bcrypt.hash(user.password, 10);

    return await userRepository.update(findUser.id, {
      ...user,
      password: encryptPass,
    });
  }

  async deleteUser(id: string) {
    const findUser = await userRepository.findOne({ where: { id: id } });
    if (!findUser) {
      throw new Error("User not found");
    }
    return await userRepository.softDelete(id);
  }
}
