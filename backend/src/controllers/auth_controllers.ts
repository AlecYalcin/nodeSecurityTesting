// Packages
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

// Models
import User from "../database/models/users";

// Configuração do dotenv
dotenv.config();

class AuthController {
  SECRET_KEY = process.env.SECRET_KEY as string;
  // Login
  login = async (req: any, res: any) => {
    const { email, password } = req.body;

    console.log(email, password);
    // Verificando existência de usuaŕio
    try {
      const user = await User.retrieve({
        email,
        password,
      });

      console.log(user);

      if (typeof user.isAdmin === "string" && user.isAdmin == "true") {
        user.isAdmin = true;
      } else if (typeof user.isAdmin === "string" && user.isAdmin == "false") {
        user.isAdmin = false;
      }

      // Gerando Token de Autenticação
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          username: user.name,
          isAdmin: user.isAdmin,
        },
        this.SECRET_KEY,
        {
          expiresIn: "48h",
        }
      );

      console.log(user);

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 1000 * 60 * 60 * 24 * 2,
      });

      console.log(user);

      return res.status(200).json({ message: "Autenticado.", id: user.id });
    } catch (error) {
      return res.status(400).json({
        message: error,
      });
    }
  };

  // Register
  register = async (req: any, res: any) => {
    try {
      // Separando elementos da requisição
      const { name, email, password } = req.body;

      // Tentando Criar Usuário
      const user = await User.create({
        name: name,
        email: email,
        password: password,
      });

      // Gerando Token de Autenticação
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          username: user.name,
          isAdmin: user.isAdmin,
        },
        this.SECRET_KEY,
        {
          expiresIn: "48h",
        }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 1000 * 60 * 60 * 24 * 2,
      });

      return res.status(201).json({
        message: "Sucesso ao criar usuário!",
        id: user.id,
      });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  };

  // Logout
  logout = async (res: any, req: any) => {};
}

const controller = new AuthController();

export default controller;
