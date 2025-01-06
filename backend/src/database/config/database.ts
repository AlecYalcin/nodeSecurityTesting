import mysql from "mysql2";
import dotenv from "dotenv";

// Models
import User from "../models/users";

// Configurando variáveis de ambiente
dotenv.config();

const env = {
  host: process.env.DB_HOST as string,
  port: Number(process.env.DB_PORT as String) as number,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
};

export const db = mysql.createConnection({
  host: env.host,
  port: env.port,
  user: env.user,
  password: env.password,
  database: env.database,
  keepAliveInitialDelay: 10000,
  enableKeepAlive: true,
  multipleStatements: true,
});

export const connection = mysql.createPool({
  host: env.host,
  port: env.port,
  user: env.user,
  password: env.password,
  database: env.database,
  keepAliveInitialDelay: 10000,
  enableKeepAlive: true,
  multipleStatements: true,
});

export const connection_clear = () => {
  let canConnect = true;
  db.connect((error) => {
    if (error) {
      canConnect = false;
    }
  });
  return canConnect;
};

export const createTables = async () => {
  await User.createUserTable();
};
