// Packages
import { QueryTypes } from "sequelize";

// Database Config
import { sequelize } from "../database/config/database";

// Model
import Payment from "../database/models/payments";

// Interface
import { BookAttribute } from "../database/models/books";
import { UserAttribute } from "../database/models/users";

class PaymentController {
  createPayment = async (req: any, res: any) => {
    const { user_id, book_id, quantity } = req.body;

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

    const price = book.price * quantity;

    // Verificar se a QUANTIDADE é POSSÍVEL
    if (book.stock < quantity) {
      return res.status(400).json({ message: "Livros indisponíveis." });
    }

    // Verificar se o USUÁRIO CONSEGUE PAGAR
    if (user.bank < price) {
      return res.status(400).json({ message: "Saldo insuficiente. " });
    }

    try {
      // Realizando o Pagamento
      const payment = await Payment.create({
        user_id: user_id,
        book_id: book_id,
        total_price: price,
        quantity: quantity,
      });

      if (payment) {
        // Retirando do Estoque
        await sequelize.query(
          `UPDATE books SET stock = ${
            book.stock - quantity
          } WHERE id = ${book_id}`
        );

        // REtirando do Usuário
        await sequelize.query(
          `UPDATE users SET bank = ${user.bank - price} WHERE id = ${user_id}`
        );
      }

      return res.status(201).json({ message: "Sucesso ao criar pagamento!" });
    } catch (error) {
      return res.status(400).json({ message: "Falha ao criar pagamento. " });
    }
  };

  readPayment = async (req: any, res: any) => {
    const { id, total, date } = req.query;

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
      return res.status(200).json(payments);
    } catch (error) {
      return res.status(400).json({ message: "Falha ao pesquisar pagamento." });
    }
  };

  deletePayment = async (req: any, res: any) => {
    const id = req.params.id;

    try {
      const payment = await Payment.destroy({
        where: {
          id: id,
        },
      });

      return res.status(200).json({ message: "Sucesso ao excluir pagamento!" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Falha ao excluir pagamento." });
    }
  };
}

const controller = new PaymentController();

export default controller;
