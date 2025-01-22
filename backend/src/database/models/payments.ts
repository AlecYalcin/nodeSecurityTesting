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
      const query = `INSERT INTO payments (book_id, user_id, total_price, quantity) VALUES ('${payment.book_id}','${payment.user_id}','${payment.total_price}','${payment.quantity}')`;

      connection.query<ResultSetHeader>(query, function (error, results) {
        if (error) {
          reject(error);
        } else {
          payment.id = results.insertId;
          resolve(payment);
        }
      });
    });
  };

  static retrieve = async (where: WherePayment): Promise<RowDataPacket> => {
    // Procurando na Base de Dados
    return new Promise((resolve, reject) => {
      let query = `SELECT id, book_id, user_id, total_price, quantity FROM payments WHERE 1=1 `;

      if (where && typeof where === "object") {
        for (const [key, value] of Object.entries(where)) {
          query += `AND ${key}='${value}' `;
        }
      } else {
        reject("Parâmetros não existentes.");
      }

      connection.query<RowDataPacket[]>(query, function (error, instance) {
        if (error) {
          reject(error);
        } else if (instance.length == 0) {
          reject("Pagamento não encontrado.");
        } else {
          resolve(instance[0]);
        }
      });
    });
  };

  static update = async (id: number, updates: any): Promise<void> => {
    // Procurando na Base de Dados
    const book = await this.retrieve({ id: id });

    // Executando Update
    return new Promise((resolve, reject) => {
      // Criando de atualização
      let query = "UPDATE payments SET ";

      // Adicionando parâmetros para atualizar
      if (updates && typeof updates === "object") {
        const keys = Object.keys(updates);
        for (let i = 0; i < keys.length; i++) {
          if (i == keys.length - 1)
            query += `${keys[i]} = "${updates[keys[i]]}"`;
          else query += `${keys[i]} = "${updates[keys[i]]}", `;
        }
      } else {
        reject("Parâmetros não colocados.");
      }

      // Finalizando query com id
      query += ` WHERE id=${id};`;

      // Executando Query
      connection.query(query, function (error) {
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

  static search = async (query: string): Promise<Array<RowDataPacket>> => {
    return new Promise((resolve, reject) => {
      connection.query<RowDataPacket[]>(query, function (error, instances) {
        if (error) {
          reject(error);
        } else {
          resolve(instances);
        }
      });
    });
  };
}

export default Payment;
