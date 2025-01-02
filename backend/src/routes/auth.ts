import express from "express";
import AuthController from "../controllers/auth_controllers";

const router = express.Router();

// Criação de Pagamento
router.post("/login", async (req, res) => AuthController.login(req, res));

export default router;
