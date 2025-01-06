import { ResultSetHeader, RowDataPacket } from "mysql2";
import { connection } from "../config/database";

export interface UserAttribute {
  id?: number;
  name: string;
  email: string;
  password: string;
  isAdmin?: number | string;
  bank?: number;
}

export interface WhereUser {
  id?: number;
  name?: string;
  password?: string;
  email?: string;
  isAdmin?: number | string;
}

class User {
  static createUserTable(): void {
    try {
      connection.query(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          bank DECIMAL(10,2) DEFAULT 0,
          isAdmin BOOLEAN DEFAULT 0,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      connection.query(`
        CREATE TRIGGER IF NOT EXISTS updatedAt_user
        AFTER UPDATE On users
        FOR EACH ROW
        BEGIN
          UPDATE users
          SET updatedAt = CURRENT_TIMESTAMP  
          WHERE id = OLD.id;
        END;
      `);

      console.log("Tabela de Usuários criada!");
    } catch (error) {
      console.error("Aconteceu um erro ao criar a tabela de usuários.", error);
    }
  }

  static create = async (user: UserAttribute): Promise<UserAttribute> => {
    console.log(user);
    // Adicionando a base de dados
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO users (name, email, password, isAdmin, bank) VALUES ('${
        user.name
      }','${user.email}','${user.password}','${user.isAdmin ? 1 : 0 || 0}','${
        user.bank || 0
      }')`;

      connection.query<ResultSetHeader>(query, function (error, results) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          user.id = results.insertId;
          resolve(user);
        }
      });
    });
  };

  static retrieve = async (where: WhereUser): Promise<RowDataPacket> => {
    // Procurando na Base de Dados
    return new Promise((resolve, reject) => {
      let query = `SELECT id, name, email, bank, isAdmin FROM users WHERE 1=1 `;

      if (where && typeof where === "object") {
        for (const [key, value] of Object.entries(where)) {
          query += `AND ${key}='${value}' `;
        }
      } else {
        reject("Parâmetros não existentes.");
      }

      console.log(query);

      connection.query<RowDataPacket[]>(query, function (error, instance) {
        if (error) {
          reject(error);
        } else if (instance.length == 0) {
          reject("Usuário não encontrado.");
        } else {
          resolve(instance[0]);
        }
      });
    });
  };

  static update = async (id: number, updates: any): Promise<void> => {
    // Procurando na Base de Dados
    const user = await this.retrieve({ id: id });

    // Executando Update
    return new Promise((resolve, reject) => {
      // Criando de atualização
      let query = "UPDATE users SET ";

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
    const user = await this.retrieve({ id: id });

    // Executando Delete
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM users WHERE id=${id}`;

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

export default User;
