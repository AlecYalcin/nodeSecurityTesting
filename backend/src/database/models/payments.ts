import { ResultSetHeader, RowDataPacket } from "mysql2";
import { connection } from "../config/database";

export interface PaymentAttribute {
  id?: number;
  book_id: number;
  user_id: number;
  total_price: number;
  quantity: number;
}

export interface WherePayment {
  id?: number;
  book_id?: number;
  user_id?: number;
  total_price?: number;
  quantity?: number;
  greater?: number;
  lower?: number;
  date?: string;
}

class Payment {
  static async createTable(): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.query(
        `
        CREATE TABLE IF NOT EXISTS payments (
          id INTEGER AUTO_INCREMENT PRIMARY KEY,
          book_id INTEGER NOT NULL,
          user_id INTEGER NOT NULL,
          total_price DECIMAL(10,2) NOT NULL DEFAULT 0,
          quantity INTEGER,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

          FOREIGN KEY(user_id) REFERENCES users(id),
          FOREIGN KEY(book_id) REFERENCES books(id)
        );
      `,
        (error) => {
          reject(error);
        }
      );

      connection.query(
        `
        CREATE TRIGGER IF NOT EXISTS updatedAt_payments
        AFTER UPDATE On payments
        FOR EACH ROW
        BEGIN
          UPDATE payments
          SET updatedAt = CURRENT_TIMESTAMP  
          WHERE id = OLD.id;
        END;
      `,
        (error) => {
          reject(error);
        }
      );

      console.log("Tabela de Pagamentos criada!");
      resolve();
    });
  }

  static async truncateTable(): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.query(
        `
        TRUNCATE TABLE payments;
      `,
        (error) => {
          reject(error);
        }
      );

      console.log("Tabela de Pagamentos limpa!");
      resolve();
    });
  }

  static create = async (
    payment: PaymentAttribute
  ): Promise<PaymentAttribute> => {
    // Adicionando a base de dados
    return new Promise((resolve, reject) => {
      // Query Inicial
      const query =
        "INSERT INTO payments (book_id, user_id, total_price, quantity) VALUES (?, ?, ?, ?)";

      // Valores da Query
      const values: any[] = [
        payment.book_id,
        payment.user_id,
        payment.total_price,
        payment.quantity,
      ];

      connection.query<ResultSetHeader>(
        query,
        values,
        function (error, results) {
          if (error) {
            reject(error);
          } else {
            payment.id = results.insertId;
            resolve(payment);
          }
        }
      );
    });
  };

  static retrieve = async (where: WherePayment): Promise<RowDataPacket> => {
    // Procurando na Base de Dados
    return new Promise((resolve, reject) => {
      // Query Inicial
      let query = `SELECT id, book_id, user_id, total_price, quantity FROM payments`;

      // Array de Condições
      const conditions: string[] = [];

      // Array de Valores
      const values: any[] = [];

      // Adicionando condições no array
      if (where && typeof where === "object") {
        for (const [key, value] of Object.entries(where)) {
          conditions.push(`${key} = ?`);
          values.push(value);
        }
      } else {
        reject("Parâmetros não existentes.");
      }

      // Adicionando as condições na query
      if (conditions.length > 0) query += " WHERE " + conditions.join(" AND ");

      // Busca no Banco de Dados
      connection.query<RowDataPacket[]>(
        query,
        values,
        function (error, instance) {
          if (error) {
            reject(error);
          } else if (instance.length == 0) {
            reject("Pagamento não encontrado.");
          } else {
            resolve(instance[0]);
          }
        }
      );
    });
  };

  static update = async (id: number, updates: WherePayment): Promise<void> => {
    // Procurando na Base de Dados
    const book = await this.retrieve({ id: id });

    // Executando Update
    return new Promise((resolve, reject) => {
      // Criando de atualização
      let query = "UPDATE payments SET ";

      // Array de Condições
      const conditions: string[] = [];

      // Array de Valores
      const values: any[] = [];

      // Adicionando condições no array
      if (updates && typeof updates === "object") {
        for (const [key, value] of Object.entries(updates)) {
          conditions.push(`${key} = ?`);
          values.push(value);
        }
      } else {
        reject("Parâmetros não existentes.");
      }

      // Adicionando as condições na query
      if (conditions.length > 0) query += conditions.join(", ");

      // Finalizando query com id
      query += ` WHERE id=${id};`;

      // Executando Query
      connection.query(query, values, function (error) {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };

  static delete = async (
    id: number,
    user_id: number | null = null
  ): Promise<void> => {
    // Procurando na Base de Dados
    const payment = await this.retrieve({ id: id });

    // Executando Delete
    return new Promise((resolve, reject) => {
      let query = `DELETE FROM payments WHERE id=${id}`;
      if (user_id) query += ` user_id=${user_id}`;

      connection.query(query, function (error) {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };

  static search = async (
    params: WherePayment,
    admin: boolean
  ): Promise<Array<RowDataPacket>> => {
    // Query de Busca para Usuários
    let query = "SELECT * FROM payments";

    // Array de Condições
    const conditions: string[] = [];

    // Array de Valores
    const values: any[] = [];

    if (params.id) {
      conditions.push("id = ?");
      values.push(params.id);
    }

    if (params.book_id) {
      conditions.push("book_id = ?");
      values.push(params.book_id);
    }

    if (params.greater) {
      conditions.push("total_price >= ?");
      values.push(params.greater);
    }

    if (params.lower) {
      conditions.push("total_price <= ?");
      values.push(params.lower);
    }

    if (params.date) {
      conditions.push("date <= ?");
      values.push(params.date);
    }

    // Diminuindo a pesquisa para admins ou usuários
    if (!admin) {
      conditions.push("user_id = ?");
      values.push(params.user_id);
    }

    // Adicionando os parâmetros na pesquisa
    if (conditions.length > 0) query += " WHERE " + conditions.join(" AND ");

    return new Promise((resolve, reject) => {
      connection.query<RowDataPacket[]>(
        query,
        values,
        function (error, instances) {
          if (error) {
            reject(error);
          } else {
            resolve(instances);
          }
        }
      );
    });
  };
}

export default Payment;
