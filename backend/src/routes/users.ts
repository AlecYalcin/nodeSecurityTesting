import express from "express";
import { sequelize } from "../database/config/database";
import User from "../database/models/users";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).send({ message: "O usuário foi criado!" });
});

// READ
router.get("/", async (req, res) => {
  const id = req.query.id;
  const name = req.query.name;
  const email = req.query.email;

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
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ message: "Aconteceu um erro na pesquisa." });
  }
});

// UPDATE
router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.update(req.body, {
      where: {
        id: id,
      },
    });

    res.status(200).send({ message: "Usuário atualizado com sucesso! " });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Aconteceu um erro ao atualizar usuário. " });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).send({ message: "Usuário excluído com sucesso! " });
  } catch (error) {
    res.status(400).send({ message: "Aconteceu um erro ao excluir usuário. " });
  }
});

export default router;
