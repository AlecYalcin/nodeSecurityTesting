import express from "express";
import UserController from "../controllers/user_controller";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router.use(verifyToken);

// CREATE
router.post("/", async (req, res) => UserController.createUser(req, res));

// SEARCH
router.get("/search", async (req, res) => UserController.searchUser(req, res));

// READ
router.get("/:id", async (req, res) => UserController.readUser(req, res));

// UPDATE
router.patch("/:id", async (req, res) => UserController.updateUser(req, res));

// DELETE
router.delete("/:id", async (req, res) => UserController.deleteUser(req, res));

export default router;
