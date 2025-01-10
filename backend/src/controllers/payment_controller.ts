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
        return res.status(404).json({ message: "Usuário não autorizado." });
      }

      // Verificar se o LIVRO existe
      const book = await Book.retrieve({ id: book_id });

      const price = book.price * quantity;

      // ERRO 400: Verificar se a QUANTIDADE é POSSÍVEL
      if (book.stock < quantity) {
        return res.status(400).json({ message: "Livros indisponíveis." });
      }

      // ERRO 400: Verificar se o USUÁRIO CONSEGUE PAGAR
      if (user.bank < price) {
        return res.status(400).json({ message: "Saldo insuficiente." });
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
      return res
        .status(400)
        .json({ message: "Falha ao criar pagamento.", error: error });
    }
  };

  readPayment = async (req: any, res: any) => {
    const { user_id, book_id, greater, lower, date } = req.query;

    // Query de Busca para Usuários
    let query = `SELECT * FROM payments WHERE user_id=${res.locals.user.id} `;

    // Query de Busca para Admins
    if (res.locals.user.isAdmin) {
      query = "SELECT * FROM payments WHERE 1=1 ";
    }
    // Alterando QUERY com Where
    if (user_id || book_id || greater || lower || date) {
      if (book_id) query += `AND book_id='${book_id}' `;
      if (greater) query += `AND total_price >='${greater}' `;
      if (lower) query += `AND total_price <='${lower}' `;
      if (date) query += +`AND date<='${date}' `;
      if (user_id && res.locals.user.isAdmin) query += `AND user_id=${user_id}`;
    }

    try {
      const payments = await Payment.search(query);
      return res.status(200).json(payments);
    } catch (error) {
      return res.status(400).json({ message: "Falha ao pesquisar pagamento." });
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
      return res.status(400).json({ message: "Falha ao excluir pagamento." });
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
        return res.status(404).json({ message: "Usuário não autorizado." });
      }

      // // ERRO 400: Usuário e Target idênticos
      if (user_id == target_id) {
        return res.status(400).json({ message: "Usuários iguais." });
      }

      // // ERRO 400: Quantidade não existente na conta
      if (total > user.bank) {
        return res.status(400).json({ message: "Banco insuficiente." });
      }

      // Retirando do usuário
      await User.update(user_id, { bank: user.bank - total });

      // Adicionando ao usuário destino
      await User.update(target_id, {
        bank: (target.bank as Number) + total,
      });

      return res.status(200).json({ message: "Transferência realizada." });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Aconteceu um erro.", error: error });
    }
  };
}

const controller = new PaymentController();

export default controller;
