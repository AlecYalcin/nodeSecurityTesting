import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

// Configuração do dotenv
dotenv.config();

// Chave Secreta do JWT
const SECRET_KEY = process.env.SECRET_KEY as string;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // Separando Bearer do Token
  const token = req.cookies.token;

  // ERRO 400: Verificando existência do Token
  if (!token) {
    res.status(400).json({ message: "Token não encontrado.", error: true });
    return;
  }

  // Verificando autenticidade do token
  jwt.verify(token, SECRET_KEY, (error: any, jwt_user: any) => {
    // ERROR 403: Token Inválido
    if (error) {
      res.status(403).json({ message: "Token não válido.", error: true });
      return;
    }

    res.locals.user = jwt_user;
  });

  next();
};

export default verifyToken;
