import express from "express";
import UserController from "../controllers/user_controller";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => UserController.createUser(req, res));

// READ
router.get("/", async (req, res) => UserController.readUser(req, res));

// UPDATE
router.patch("/:id", verifyToken, async (req, res) =>
  UserController.updateUser(req, res)
);

// DELETE
router.delete("/:id", verifyToken, async (req, res) =>
  UserController.deleteUser(req, res)
);

export default router;
