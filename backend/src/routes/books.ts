import express from "express";
import { sequelize } from "../database/config/database";
import Book from "../database/models/books";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).send({ message: "O livro foi criado!" });
});

// READ
router.get("/", async (req, res) => {
  const id = req.query.id;
  const title = req.query.title;
  const author = req.query.author;

  // Query de Busca
  let query = "SELECT * FROM books";

  // Alterando QUERY com Where
  if (id || title || author) {
    query = query + " WHERE ";
    if (id) query = query + `id=${id} `;
    if (title) query = query + `title=${title} `;
    if (author) query = query + `author=${author} `;
    console.log(query);
  }

  try {
    const [books, metadata] = await sequelize.query(query);
    res.status(200).send(books);
  } catch (error) {
    res.status(400).send({ message: "Aconteceu um erro na pesquisa." });
  }
});

// UPDATE
router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Book.update(req.body, {
      where: {
        id: id,
      },
    });

    res.status(200).send({ message: "Livro atualizado com sucesso!" });
  } catch (error) {
    res.status(400).send({ message: "Aconteceu um erro ao atualizar Livro." });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Book.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).send({ message: "Livro excluído com sucesso! " });
  } catch (error) {
    res.status(400).send({ message: "Aconteceu um erro ao excluir Livro. " });
  }
});

export default router;
