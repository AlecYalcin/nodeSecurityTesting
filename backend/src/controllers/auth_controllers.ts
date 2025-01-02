// Packages
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

// Database Config
import { QueryTypes } from "sequelize";
import { sequelize } from "../database/config/database";

// Models
import User, { UserAttribute } from "../database/models/users";

// Configuração do dotenv
dotenv.config();

class AuthController {
  SECRET_KEY = process.env.SECRET_KEY as string;
  // Login
  login = async (req: any, res: any) => {
    const { email, password } = req.body;

    // Verificando existência de usuaŕio
    const user = await sequelize.query<UserAttribute>(
      `SELECT * FROM users WHERE email = ${email} AND password = ${password}`,
      {
        type: QueryTypes.SELECT,
        plain: true,
      }
    );

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Gerando Token de Autenticação
    const token = jwt.sign(
      { id: user.id, email: user.email },
      this.SECRET_KEY,
      {
        expiresIn: "48h",
      }
    );

    return res
      .status(200)
      .json({ message: "Autenticado com sucesso.", token: token });
  };

  // Register
  register = async (res: any, req: any) => {};

  // Logout
  logout = async (res: any, req: any) => {};
}

const controller = new AuthController();

export default controller;
