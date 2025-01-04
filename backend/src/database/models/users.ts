import { db } from "../config/database";

export interface UserAttribute {
  id?: number;
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  bank?: number;
}

export interface WhereUser {
  id?: number;
  name?: string;
  password?: string;
  email?: string;
  isAdmin?: boolean;
}

class User {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public isAdmin!: boolean;
  public bank!: number;

  static createUserTable(): void {
    try {
      db.serialize(() => {
        db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          bank REAL DEFAULT 0,
          isAdmin BOOLEAN DEFAULT 0,
          createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
          updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
        );
      `);

        db.run(`
        CREATE TRIGGER IF NOT EXISTS updatedAt_user
        AFTER UPDATE On users
        FOR EACH ROW
        BEGIN
          UPDATE users
          SET updatedAt = CURRENT_TIMESTAMP  
          WHERE id = OLD.id;
        END;
      `);
      });
    } catch (error) {
      console.error("Aconteceu um erro ao criar a tabela de usuários.", error);
    }
  }

  static create = async (user: UserAttribute): Promise<User> => {
    const newUser = new User();

    // Adicionando os atributos
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.password = user.password;
    newUser.isAdmin = user.isAdmin || false;
    newUser.bank = user.bank || 0;

    // Adicionando a base de dados
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO users (name, email, password, isAdmin, bank) VALUES ('${newUser.name}','${newUser.email}','${newUser.password}','${newUser.isAdmin}','${newUser.bank}')`;

      console.log(query);

      db.run(query, function (error) {
        if (error) {
          reject(error);
        } else {
          newUser.id = this.lastID;
          resolve(newUser);
        }
      });
    });
  };

  static retrieve = async (where: WhereUser): Promise<User> => {
    const user = new User();

    // Procurando na Base de Dados
    return new Promise((resolve, reject) => {
      let query = `SELECT id, name, email, bank FROM users WHERE 1=1 `;

      if (where && typeof where === "object") {
        for (const [key, value] of Object.entries(where)) {
          query += `AND ${key}=${value}`;
        }
      } else {
        reject("Parâmetros não existenstes.");
      }

      db.get(query, function (error, instance: UserAttribute) {
        if (error) {
          reject(error);
        } else if (instance === undefined) {
          reject("Usuário não encontrado.");
        } else {
          user.id = instance.id || 0;
          user.name = instance.name;
          user.email = instance.email;
          user.bank = instance.bank || 0;

          resolve(user);
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
      db.run(query, function (error) {
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

      db.run(query, function (error) {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };

  static search = async (query: string): Promise<Array<User>> => {
    return new Promise((resolve, reject) => {
      db.all(query, function (error, instances: Array<User>) {
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
