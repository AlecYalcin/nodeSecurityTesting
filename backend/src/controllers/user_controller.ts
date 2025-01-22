// Model
import User from "../database/models/users";

class UserController {
  // Create User
  createUser = async (req: any, res: any) => {
    // ERRO 403: Verificando Token
    if (!res.locals.user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Usuário não autorizado.", error: true });
    }

    try {
      const { name, email, password, bank, isAdmin } = req.body;

      await User.create({ name, email, password, bank, isAdmin });
      return res.status(201).json({ message: "Sucesso ao criar usuário!" });
    } catch (error) {
      return res.status(400).json({ message: error, error: true });
    }
  };

  readUser = async (req: any, res: any) => {
    const id = req.params.id;

    // ERRO 403: Verificando Token
    if (id != res.locals.user.id && !res.locals.user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Usuário não autorizado.", error: true });
    }

    try {
      const user = await User.retrieve({ id });

      if (!user) {
        return res
          .status(404)
          .json({ message: "Usuário não encontrado.", error: true });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: error, error: true });
    }
  };

  // Read/List/Search User
  searchUser = async (req: any, res: any) => {
    // Parâmetros de Busca
    const { id, name, email, isAdmin } = req.query;
    // ERRO 403: Verificando Token

    if (!res.locals.user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Usuário não autorizado.", error: true });
    }

    // Query de Busca
    let query = "SELECT id, name, email, isAdmin, bank FROM users WHERE 1=1 ";

    // Alterando QUERY com Where
    if (id || name || email || isAdmin) {
      if (id) query += `AND id='${id}' `;
      if (name) query += `AND name LIKE '%${name}%' `;
      if (email) query += `AND email LIKE '%${email}%' `;
      if (isAdmin) query += `AND isAdmin='${isAdmin}'`;
    }

    try {
      const users = await User.search(query);
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ message: error, error: true });
    }
  };

  // Update User
  updateUser = async (req: any, res: any) => {
    const id = req.params.id;

    // ERRO 403: Verificando Token
    if (id != res.locals.user.id && !res.locals.user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Usuário não autorizado.", error: true });
    }

    try {
      await User.update(id, req.body);

      return res.status(200).json({ message: "Sucesso ao atualizar usuário!" });
    } catch (error) {
      return res.status(400).json({ message: error, error: true });
    }
  };

  // Delete User
  deleteUser = async (req: any, res: any) => {
    const id = req.params.id;

    // ERRO 403: Verificando Token
    if (id != res.locals.user.id && !res.locals.user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Usuário não autorizado.", error: true });
    }

    try {
      await User.delete(id);

      return res.status(200).json({ message: "Sucesso ao excluir usuário!" });
    } catch (error) {
      return res.status(400).json({ message: error, error: true });
    }
  };
}

const controller = new UserController();

export default controller;
