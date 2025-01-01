// Database Config
import { sequelize } from "../database/config/database";
// Model
import User from "../database/models/users";

class UserController {
  // Create User
  createUser = async (req: any, res: any) => {
    try {
      await User.create(req.body);
      return res.status(201).send({ message: "Sucesso ao criar usuário!" });
    } catch (error) {
      return res.status(400).json({ message: "Falha ao criar o usuário." });
    }
  };

  // Read/List/Search User
  readUser = async (req: any, res: any) => {
    // Parâmetros de Busca
    const { id, name, email } = req.query;

    // Query de Busca
    let query = "SELECT * FROM users";

    // Alterando QUERY com Where
    if (id || name || email) {
      query = query + " WHERE ";
      if (id) query = query + `id=${id} `;
      if (name) query = query + `name=${name} `;
      if (email) query = query + `email=${email} `;
      console.log(query);
    }

    try {
      const [users, metadata] = await sequelize.query(query);
      return res.status(200).send(users);
    } catch (error) {
      return res.status(400).send({ message: "Falha ao buscar usuário." });
    }
  };

  // Update User
  updateUser = async (req: any, res: any) => {
    const id = req.params.id;

    try {
      await User.update(req.body, {
        where: {
          id: id,
        },
      });

      return res.status(200).send({ message: "Sucesso ao atualizar usuário!" });
    } catch (error) {
      return res.status(400).send({ message: "Falha ao atualizar usuário." });
    }
  };

  // Delete User
  deleteUser = async (req: any, res: any) => {
    const id = req.params.id;

    try {
      await User.destroy({
        where: {
          id: id,
        },
      });

      return res.status(200).send({ message: "Sucesso ao excluir usuário! " });
    } catch (error) {
      return res.status(400).send({ message: "Falha ao excluir usuário. " });
    }
  };
}

const controller = new UserController();

export default controller;
