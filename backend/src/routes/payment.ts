import express from "express";
import PaymentController from "../controllers/payment_controller";

const router = express.Router();

// Criação de Pagamento
router.post("/create", async (req, res) =>
  PaymentController.createPayment(req, res)
);

// Listagem de Pagamentos
router.get("/list", async (req, res) =>
  PaymentController.readPayment(req, res)
);

// Destuir pagamentos
router.delete("/:id", async (req, res) =>
  PaymentController.deletePayment(req, res)
);

export default router;
