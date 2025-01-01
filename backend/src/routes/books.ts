import express from "express";
import BookController from "../controllers/book_controller";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => BookController.createBook(req, res));

// READ
router.get("/", async (req, res) => BookController.readBook(req, res));

// UPDATE
router.patch("/:id", async (req, res) => BookController.updateBook(req, res));

// DELETE
router.delete("/:id", async (req, res) => BookController.deleteBook(req, res));

export default router;
