import express from "express";
import AuthController from "../controllers/auth_controllers";
import cache from "../utils/cache";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username } = req.body;

  const cachedLogin = cache.get(username);

  if (cachedLogin) {
    return res.json(cachedLogin);
  }

  try {
    const result = await AuthController.login(req, res);
    cache.set(username, result, 300);
    return result;
  } catch (error) {
    return res.status(500).json({ message: "Erro no login" });
  }
});

router.post("/register", async (req, res) => {
  const { username } = req.body;

  const cachedUser = cache.get(username);

  if (cachedUser) {
    return res.status(400).json({ message: "Usuário já registrado" });
  }

  try {
    const result = await AuthController.register(req, res);
    cache.set(username, result, 600);
    return result;
  } catch (error) {
    return res.status(500).json({ message: "Erro ao registrar usuário" });
  }
});

export default router;
