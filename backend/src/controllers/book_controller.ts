// Database Config
import { sequelize } from "../database/config/database";
// Model
import Book from "../database/models/books";

class BookController {
  // Create Book
  createBook = async (req: any, res: any) => {
    try {
      await Book.create(req.body);
      return res.status(201).json({ message: "Sucesso ao criar o livro." });
    } catch (error) {
      return res.status(400).json({ message: "Falha ao criar o livro." });
    }
  };

  // Read/List/Search Book
  readBook = async (req: any, res: any) => {
    // Parâmetros de Busca
    const { id, title, author, price, stock } = req.query;

    // Query de Busca
    let query = "SELECT * FROM books";

    // Alterando QUERY com Where
    if (id || title || author || price || stock) {
      query = query + " WHERE ";
      if (id) query = query + `id=${id} `;
      if (title) query = query + `title=${title} `;
      if (author) query = query + `author=${author} `;
      if (price) query = query + `price<=${price} `;
      if (stock) query = query + `stock<=${stock} `;
    }

    try {
      const [books, metadata] = await sequelize.query(query);
      return res.status(200).send(books);
    } catch (error) {
      return res.status(404).json({ message: "Falha ao buscar o livro." });
    }
  };

  // Update Book
  updateBook = async (req: any, res: any) => {
    const id = req.params.id;

    try {
      const book = await Book.update(req.body, {
        where: {
          id: id,
        },
      });

      return res.status(200).send({ message: "Sucesso ao atualizar o livro" });
    } catch (error) {
      return res.status(400).send({ message: "Falha ao atualizar o livro." });
    }
  };

  // Delete Book
  deleteBook = async (req: any, res: any) => {
    const id = req.params.id;

    try {
      const book = await Book.destroy({
        where: {
          id: id,
        },
      });

      return res.status(200).send({ message: "Livro excluído com sucesso! " });
    } catch (error) {
      return res.status(400).send({ message: "Falha ao excluir Livro. " });
    }
  };
}

const controller = new BookController();

export default controller;
