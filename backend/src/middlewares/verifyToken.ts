import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

// Configuração do dotenv
dotenv.config();

// Chave Secreta do JWT
const SECRET_KEY = process.env.SECRET_KEY as string;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  // ERRO 400: Verificando existência do Token
  if (!authHeader) {
    res.status(400).json({ message: "Token não encontrado." });
    return;
  }

  // Separando Bearer do Token
  const token = authHeader.split(" ")[1];

  // Verificando autenticidade do token
  jwt.verify(token, SECRET_KEY, (error, jwt_user) => {
    // ERROR 403: Token Inválido
    if (error) {
      res.status(403).json({ message: "Token não válido." });
      return;
    }

    next();
  });
};

export default verifyToken;
