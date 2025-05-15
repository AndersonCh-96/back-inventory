import { Service } from "typedi";
import { userRepository } from "../repositories/user.repository";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
@Service()
export class AuthService {
  async signIn(user: any) {
    const { email, password } = user;

    console.log("usuar", user);
    const verifyUser = await userRepository.findOne({
      where: { email: email },
    });
    if (!verifyUser) {
      throw new Error("Usuario o contraseña incorrecta");
    }
    const comparePassword = await bcrypt.compare(
      password,
      verifyUser?.password
    );

    if (!comparePassword) {
      throw new Error("Usuario o contraseña incorrecta");
    }

    const token = jwt.sign({ userId: verifyUser.id }, "TEST123", {
      expiresIn: "1d",
    });
    const obj = {
      user: verifyUser,
      token,
      status: 1,
    };
    return obj;
  }
}
