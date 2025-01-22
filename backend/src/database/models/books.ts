import { ResultSetHeader, RowDataPacket } from "mysql2";
import { connection } from "../config/database";

export interface BookAttribute {
  id?: number;
  title: string;
  author: string;
  description?: string;
  price: number;
  stock: number;
  img?: string;
}

export interface WhereBook {
  id?: number;
  title?: string;
  author?: string;
  greaterThan?: number;
  lowerThan?: number;
  stock?: number;
}

class Book {
  static async createTable(): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.query(
        `
        CREATE TABLE IF NOT EXISTS books (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          author VARCHAR(255) NOT NULL,
          description VARCHAR(255) NOT NULL,
          price DECIMAL(10,2) NOT NULL DEFAULT 0,
          stock INTEGER,
          img VARCHAR(255),
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `,
        (error) => {
          reject(error);
        }
      );

      connection.query(
        `
        CREATE TRIGGER IF NOT EXISTS updatedAt_books
        AFTER UPDATE On books
        FOR EACH ROW
        BEGIN
          UPDATE books
          SET updatedAt = CURRENT_TIMESTAMP  
          WHERE id = OLD.id;
        END;
      `,
        (error) => {
          reject(error);
        }
      );

      console.log("Tabela de Livros criada!");
      resolve();
    });
  }

  static async truncateTable(): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.query(
        `
        SET FOREIGN_KEY_CHECKS = 0;
        TRUNCATE TABLE books;
        SET FOREIGN_KEY_CHECKS = 1;
      `,
        (error) => {
          reject(error);
        }
      );

      console.log("Tabela de Livros limpa!");
      resolve();
    });
  }

  static create = async (book: BookAttribute): Promise<BookAttribute> => {
    // Adicionando a base de dados
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO books (title, author, description, price, stock, img) VALUES ('${
        book.title
      }','${book.author}','${book.description || ""}','${book.price}','${
        book.stock
      }','${book.img}')`;

      connection.query<ResultSetHeader>(query, function (error, results) {
        if (error) {
          reject(error);
        } else {
          book.id = results.insertId;
          resolve(book);
        }
      });
    });
  };

  static retrieve = async (where: WhereBook): Promise<RowDataPacket> => {
    // Procurando na Base de Dados
    return new Promise((resolve, reject) => {
      let query = `SELECT id, title, author, description, price, stock FROM books WHERE 1=1 `;

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
          reject("Livro não encontrado.");
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
      let query = "UPDATE books SET ";

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

  static delete = async (id: number): Promise<void> => {
    // Procurando na Base de Dados
    const book = await this.retrieve({ id: id });

    // Executando Delete
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM books WHERE id=${id}`;

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

export default Book;
