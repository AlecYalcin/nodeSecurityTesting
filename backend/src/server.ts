import { createServer } from "http";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  console.log(err);
});

const port = 3000;

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Olá, Node.js com TypeScript!");
});

server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
