// Packages
import { QueryTypes } from "sequelize";
import express from "express";

// Modules
import { sequelize } from "../database/config/database";

// Interface
import { BookAttribute } from "../database/models/books";
import { UserAttribute } from "../database/models/users";

// Models
import User from "../database/models/users";
import Book from "../database/models/books";
import Payment from "../database/models/payments";
import BookPayment from "../database/models/books_of_payment";
import dayjs from "dayjs";

const router = express.Router();

// Criação de Pagamento
router.post("/create", async (req, res) => {
  const user_id = req.body.user_id;
  const book_id = req.body.book_id;
  const quantity = req.body.quantity;

  // Verificar se o USUÁRIO existe
  const user = await sequelize.query<UserAttribute>(
    `SELECT * FROM users WHERE id=${user_id}`,
    {
      type: QueryTypes.SELECT,
      plain: true,
    }
  );

  if (!user) {
    res.status(404).send({ message: "Usuário não encontrado." });
    return;
  }

  // Verificar se o LIVRO existe
  const book = await sequelize.query<BookAttribute>(
    `SELECT * FROM books WHERE id=${book_id}`,
    {
      type: QueryTypes.SELECT,
      plain: true,
    }
  );

  if (!book) {
    res.status(404).send({ message: "Livro não encontrado." });
    return;
  }

  // Verificar se a QUANTIDADE é POSSÍVEL
  if (book.stock < quantity) {
    res.status(400).send({
      message: "Não há quantidade de livros disponível.",
    });
    return;
  }

  const total_price = book.price * quantity;
  try {
    // Realizando o Pagamento
    const payment = await Payment.create({
      user_id: user_id,
      book_id: book_id,
      total_price: total_price,
      quantity: quantity,
    });

    // Retirando do Estoque
    if (payment) {
      await sequelize.query(
        `UPDATE books SET stock = ${
          book.stock - quantity
        } WHERE id = ${book_id}`
      );
    }

    res.sendStatus(201).send();
  } catch (error) {
    console.log(error);
    res.sendStatus(400).send({ message: "Aconteceu um erro. " });
  }
});

// Listagem de Pagamentos
router.get("/list", async (req, res) => {
  const id = req.query.id;
  const total = req.query.total;
  const date = req.query.date;

  // Query de Busca
  let query = "SELECT * FROM payments";

  // Alterando QUERY com Where
  if (id || total || date) {
    query = query + " WHERE ";
    if (id) query = query + `id=${id} `;
    if (total) query = query + `total_price=${total} `;
    if (date) query = query + `date=${date} `;
  }

  try {
    const [payments, metadata] = await sequelize.query(query);
    res.status(200).send(payments);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Aconteceu um erro na pesquisa." });
  }
});

// Destuir pagamentos
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const payment = await Payment.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).send({ message: "Pagamento excluído com sucesso!" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: "Aconteceu um erro ao excluir o pagamento." });
  }
});

export default router;
