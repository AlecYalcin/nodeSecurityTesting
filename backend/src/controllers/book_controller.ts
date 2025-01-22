// Model
import Book from "../database/models/books";

class BookController {
  // Create Book
  createBook = async (req: any, res: any) => {
    // ERRO 403: Não-admins não autorizados.
    if (!res.locals.user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Usuário não autorizado.", error: true });
    }

    try {
      await Book.create(req.body);
      return res.status(201).json({ message: "Sucesso ao criar o livro." });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Falha ao criar o livro.", error: true });
    }
  };

  // Read Book
  readBook = async (req: any, res: any) => {
    const id = req.params.id;

    try {
      const book = await Book.retrieve({ id: id });

      if (!book) {
        return res
          .status(404)
          .json({ message: "Livro não encontrado.", error: true });
      }

      return res.status(200).json(book);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Erro ao procurar livro.", error: true });
    }
  };

  // Read/List/Search Book
  searchBook = async (req: any, res: any) => {
    // Parâmetros de Busca
    const { id, title, author, greater, lower, stock, recent } = req.query;

    try {
      const books = await Book.search({
        id,
        title,
        author,
        greater,
        lower,
        stock,
        recent,
      });
      return res.status(200).json(books);
    } catch (error) {
      return res.status(404).json({ message: error, error: true });
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
      await Book.update(id, req.body);

      return res.status(200).json({ message: "Sucesso ao atualizar o livro" });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Falha ao atualizar o livro.", error: error });
    }
  };

  // Delete Book
  deleteBook = async (req: any, res: any) => {
    const id = req.params.id;

    // ERRO 403: Não-admins não autorizados.
    if (!res.locals.user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Usuário não autorizado.", error: true });
    }

    try {
      await Book.delete(id);

      return res.status(200).json({ message: "Livro excluído com sucesso!" });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Falha ao excluir Livro.", error: true });
    }
  };
}

const controller = new BookController();

export default controller;
