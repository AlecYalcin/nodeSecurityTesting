// Packages
import express from "express";

// Modules
import { syncDatabase } from "./database/config/database";
import userRoutes from "./routes/users";
import bookRoutes from "./routes/books";

// Servidor Database
syncDatabase()
  .then(() => {
    console.log("Database is ready.");
  })
  .catch((error) => {
    console.log("An error has ocurred.\n", error);
  });

// Servidor Express
const app = express();

// Express com Json
app.use(express.json());

// Rotas de Usuários
app.use("/users", userRoutes);
app.use("/books", bookRoutes);

// app.get("/", (req, res) => {});

app.listen(3000);
