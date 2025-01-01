import express from "express";
import UserController from "../controllers/user_controller";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => UserController.createUser(req, res));

// READ
router.get("/", async (req, res) => UserController.readUser(req, res));

// UPDATE
router.patch("/:id", async (req, res) => UserController.updateUser(req, res));

// DELETE
router.delete("/:id", async (req, res) => UserController.deleteUser(req, res));

export default router;
