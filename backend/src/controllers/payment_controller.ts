// Packages
import { QueryTypes } from "sequelize";

// Database Config
import { sequelize } from "../database/config/database";

// Model
import Payment from "../database/models/payments";

// Interface
import Book, { BookAttribute } from "../database/models/books";
import User, { UserAttribute } from "../database/models/users";

class PaymentController {
  createPayment = async (req: any, res: any) => {
    const { user_id, book_id, quantity } = req.body;

    // Verificar se o USUÁRIO existe
    const user = await User.findOne({ where: { id: user_id } });

    // ERRO 404: Usuário não Encontrado.
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // ERRO 403: Token não autorizado.
    if (res.locals.user.id != user_id && !res.locals.user.isAdmin) {
      return res.status(404).json({ message: "Usuário não autorizado." });
    }

    // Verificar se o LIVRO existe
    const book = await Book.findOne({ where: { id: book_id } });

    // ERRO 404: Livro não Encontrado
    if (!book) {
      return res.status(404).json({ message: "Livro não encontrado." });
    }

    const price = book.dataValues.price * quantity;

    // ERRO 400: Verificar se a QUANTIDADE é POSSÍVEL
    if (book.dataValues.stock < quantity) {
      return res.status(400).json({ message: "Livros indisponíveis." });
    }

    // ERRO 400: Verificar se o USUÁRIO CONSEGUE PAGAR
    if (user.dataValues.bank < price) {
      return res.status(400).json({ message: "Saldo insuficiente." });
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
        await Book.update(
          {
            stock: book.dataValues.stock - quantity,
          },
          {
            where: {
              id: book_id,
            },
          }
        );

        // Retirando do Banco
        await User.update(
          {
            bank: user.dataValues.bank - price,
          },
          {
            where: {
              id: user_id,
            },
          }
        );
      }

      return res.status(201).json({ message: "Sucesso ao criar pagamento!" });
    } catch (error) {
      return res.status(400).json({ message: "Falha ao criar pagamento." });
    }
  };

  readPayment = async (req: any, res: any) => {
    const { user_id, book_id, total, date } = req.query;

    // Query de Busca para Usuários
    let query = `SELECT * FROM payments WHERE user_id=${res.locals.user.id} `;

    // Query de Busca para Admins
    if (res.locals.user.isAdmin) {
      query = "SELECT * FROM payments WHERE 1=1 ";
    }
    // Alterando QUERY com Where
    if (user_id || book_id || total || date) {
      if (book_id) query += `AND book_id=${book_id} `;
      if (total) query += `AND total_price<=${total} `;
      if (date) query += +`AND date<=${date} `;
      if (user_id && res.locals.user.isAdmin) query += `AND user_id=${user_id}`;
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
      let payment = 0;

      if (res.locals.user.isAdmin) {
        payment = await Payment.destroy({
          where: {
            id: id,
          },
        });
      } else {
        payment = await Payment.destroy({
          where: {
            id: id,
            user_id: res.locals.user.id,
          },
        });
      }

      // ERRO 403: Nenhum registro foi excluído. Logo, usuário não autorizado ou não existe esse registro
      if (payment == 0) {
        return res.status(403).json({ message: "Falha ao excluir pagamento." });
      }

      return res.status(200).json({ message: "Sucesso ao excluir pagamento!" });
    } catch (error) {
      return res.status(400).json({ message: "Falha ao excluir pagamento." });
    }
  };

  transferBank = async (req: any, res: any) => {
    const { user_id, target_id, total } = req.body;

    // Recuperando Usuário
    const user = await User.findOne({
      where: {
        id: user_id,
      },
    });

    // Recuperando Usuário de Destino
    const target = await User.findOne({
      where: {
        id: target_id,
      },
    });

    // ERRO 404: Verificando existência de usuários
    if (!user || !target) {
      return res.status(404).json({ message: "Usuários não encontrados." });
    }

    // ERRO 403: Token não autorizado.
    if (res.locals.user.id != user_id) {
      return res.status(404).json({ message: "Usuário não autorizado." });
    }

    // ERRO 400: Usuário e Target idênticos
    if (user_id == target_id) {
      return res.status(400).json({ message: "Usuários iguais." });
    }

    // ERRO 400: Quantidade não existente na conta
    if (total > user.dataValues.bank) {
      return res.status(400).json({ message: "Banco insuficiente." });
    }

    try {
      // Retirando do usuário
      await User.update(
        {
          bank: user.dataValues.bank - total,
        },
        {
          where: { id: user_id },
        }
      );

      // Adicionando ao usuário destino
      await User.update(
        {
          bank: target.dataValues.bank + total,
        },
        {
          where: { id: target_id },
        }
      );

      return res.status(200).json({ message: "Transferência realizada." });
    } catch (error) {
      return res.status(400).json({ message: "Aconteceu um erro." });
    }
  };
}

const controller = new PaymentController();

export default controller;
