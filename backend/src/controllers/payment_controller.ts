// Model
import Payment from "../database/models/payments";

// Interface
import Book, { BookAttribute } from "../database/models/books";
import User, { UserAttribute } from "../database/models/users";

class PaymentController {
  createPayment = async (req: any, res: any) => {
    const { user_id, book_id, quantity } = req.body;

    try {
      // Verificar se o USUÁRIO existe
      const user = await User.retrieve({ id: user_id });

      // ERRO 403: Token não autorizado.
      if (res.locals.user.id != user_id && !res.locals.user.isAdmin) {
        return res
          .status(404)
          .json({ message: "Usuário não autorizado.", error: true });
      }

      // Verificar se o LIVRO existe
      const book = await Book.retrieve({ id: book_id });

      // Calculando o preço final
      const price = book.price * quantity;

      // ERRO 400: Verificar se a QUANTIDADE é POSSÍVEL
      if (book.stock < quantity) {
        return res
          .status(400)
          .json({ message: "Livros indisponíveis.", error: true });
      }

      // ERRO 400: Verificar se o USUÁRIO CONSEGUE PAGAR
      if (user.bank < price) {
        return res
          .status(400)
          .json({ message: "Saldo insuficiente.", error: true });
      }

      // Realizando o Pagamento
      const payment = await Payment.create({
        user_id: user_id,
        book_id: book_id,
        total_price: price,
        quantity: quantity,
      });

      if (payment) {
        // Retirando do Estoque
        await Book.update(book_id, {
          stock: book.stock - quantity,
        });

        // Retirando do Banco
        await User.update(user_id, {
          bank: user.bank - price,
        });
      }

      return res.status(201).json({ message: "Sucesso ao criar pagamento!" });
    } catch (error) {
      return res.status(400).json({ message: error, error: true });
    }
  };

  readPayment = async (req: any, res: any) => {
    const { id, user_id, book_id, greater, lower, date } = req.query;

    try {
      const payments = await Payment.search(
        {
          id,
          user_id,
          book_id,
          greater,
          lower,
          date,
        },
        res.locals.user.isAdmin
      );
      return res.status(200).json(payments);
    } catch (error) {
      return res.status(400).json({ message: error, error: true });
    }
  };

  deletePayment = async (req: any, res: any) => {
    const id = req.params.id;

    try {
      if (res.locals.user.isAdmin) {
        await Payment.delete(id);
      } else {
        await Payment.delete(id, res.locals.user.id);
      }
      return res.status(200).json({ message: "Sucesso ao excluir pagamento!" });
    } catch (error) {
      return res.status(400).json({ message: error, error: true });
    }
  };

  transferBank = async (req: any, res: any) => {
    const { user_id, target_id, total } = req.body;

    try {
      // Recuperando Usuário
      const user = await User.retrieve({ id: user_id });

      // Recuperando Usuário de Destino
      const target = await User.retrieve({ id: target_id });

      // ERRO 403: Token não autorizado.
      if (res.locals.user.id != user_id && !res.locals.user.isAdmin) {
        return res
          .status(404)
          .json({ message: "Usuário não autorizado.", error: true });
      }

      // ERRO 400: Usuário e Target idênticos
      if (user_id == target_id) {
        return res
          .status(400)
          .json({ message: "Usuários iguais.", error: true });
      }

      // ERRO 400: Quantidade não existente na conta
      if (total > user.bank) {
        return res
          .status(400)
          .json({ message: "Banco insuficiente.", error: true });
      }

      // Retirando do usuário
      await User.update(user_id, { bank: user.bank - total });

      // Adicionando ao usuário destino
      await User.update(target_id, {
        bank: (target.bank as Number) + total,
      });

      return res.status(200).json({ message: "Transferência realizada." });
    } catch (error) {
      return res.status(400).json({ message: error, error: true });
    }
  };
}

const controller = new PaymentController();

export default controller;
