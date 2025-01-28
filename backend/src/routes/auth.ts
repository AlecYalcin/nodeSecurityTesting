import express from "express";
import AuthController from "../controllers/auth_controllers";

const router = express.Router();

// Login
router.post("/login", async (req: any, res: any) =>
  AuthController.login(req, res)
);

// Registro
router.post("/register", async (req: any, res: any) =>
  AuthController.register(req, res)
);

export default router;
