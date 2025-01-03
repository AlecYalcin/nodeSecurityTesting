import express from "express";
import AuthController from "../controllers/auth_controllers";

const router = express.Router();

// Login
router.post("/login", async (req, res) => AuthController.login(req, res));

// Registro
router.post("/register", async (req, res) => AuthController.register(req, res));

export default router;
