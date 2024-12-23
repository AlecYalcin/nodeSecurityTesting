import { createServer } from "http";

const port = 3000;

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Olá, Node.js com TypeScript!");
});

server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
