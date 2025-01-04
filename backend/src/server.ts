// Packages
import express from "express";

// Modules
import { createTables } from "./database/config/database";
import seeder from "./database/seed";
import userRoutes from "./routes/users";
import bookRoutes from "./routes/books";
import paymentRoutes from "./routes/payment";
import authRoutes from "./routes/auth";

// Estabelecendo Banco de Dados
createTables();

// Servidor Express
const app = express();

// Express com Json
app.use(express.json());

// Rotas de Usuários
app.use("/users", userRoutes);
// app.use("/books", bookRoutes);
// app.use("/payments", paymentRoutes);
// app.use("/auth", authRoutes);

// Rota de Seeding
// app.get("/seed", async (req, res) => {
//   try {
//     await seeder();
//     res.status(200).send({ message: "O banco de dados foi semeado." });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ message: "Aconteceu um erro ao semear." });
//   }
// });

app.listen(3000);
