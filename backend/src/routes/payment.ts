import express from "express";
import PaymentController from "../controllers/payment_controller";
import verifyToken from "../middlewares/verifyToken";

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

// Transferência Bancária
router.post("/transfer", async (req, res) =>
  PaymentController.transferBank(req, res)
);

export default router;
