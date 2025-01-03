// Database Config
import { sequelize } from "../database/config/database";
// Model
import Book from "../database/models/books";

class BookController {
  // Create Book
  createBook = async (req: any, res: any) => {
    // ERRO 403: Não-admins não autorizados.
    if (!res.locals.user.isAdmin) {
      return res.status(403).json({ message: "Usuário não autorizado." });
    }

    try {
      await Book.create(req.body);
      return res.status(201).json({ message: "Sucesso ao criar o livro." });
    } catch (error) {
      return res.status(400).json({ message: "Falha ao criar o livro." });
    }
  };

  // Read Book
  readBook = async (req: any, res: any) => {
    const id = req.params.id;

    try {
      const book = await Book.findOne({
        where: {
          id: id,
        },
      });

      if (!book) {
        return res.status(404).json({ message: "Livro naõ encontrado." });
      }

      return res.status(200).json(book);
    } catch (error) {
      return res.status(400).json({ message: "Erro ao procurar livro." });
    }
  };

  // Read/List/Search Book
  searchBook = async (req: any, res: any) => {
    // Parâmetros de Busca
    const { id, title, author, price, stock } = req.query;

    // Query de Busca
    let query = "SELECT * FROM books";

    // Alterando QUERY com Where
    if (id || title || author || price || stock) {
      // Modificando QUERY para Busca com Where
      query += " WHERE ";

      // Adicionando Parâmetros
      if (id) query += `id=${id}`;
      if (title) query += `title LIKE '%${title}%'`;
      if (author) query += `author LIKE '%${author}%'`;
      if (price) query += `price<=${price} `;
      if (stock) query += `stock<=${stock} `;
    }

    try {
      const [books, metadata] = await sequelize.query(query);
      return res.status(200).json(books);
    } catch (error) {
      return res.status(404).json({ message: "Falha ao buscar o livro." });
    }
  };

  // Update Book
  updateBook = async (req: any, res: any) => {
    const id = req.params.id;

    // ERRO 403: Não-admins não autorizados.
    if (!res.locals.user.isAdmin) {
      return res.status(403).json({ message: "Usuário não autorizado." });
    }

    try {
      const book = await Book.update(req.body, {
        where: {
          id: id,
        },
      });

      return res.status(200).json({ message: "Sucesso ao atualizar o livro" });
    } catch (error) {
      return res.status(400).json({ message: "Falha ao atualizar o livro." });
    }
  };

  // Delete Book
  deleteBook = async (req: any, res: any) => {
    const id = req.params.id;

    // ERRO 403: Não-admins não autorizados.
    if (!res.locals.user.isAdmin) {
      return res.status(403).json({ message: "Usuário não autorizado." });
    }

    try {
      const book = await Book.destroy({
        where: {
          id: id,
        },
      });

      return res.status(200).json({ message: "Livro excluído com sucesso!" });
    } catch (error) {
      return res.status(400).json({ message: "Falha ao excluir Livro." });
    }
  };
}

const controller = new BookController();

export default controller;
