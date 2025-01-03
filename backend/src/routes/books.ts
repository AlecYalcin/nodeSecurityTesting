import express from "express";
import BookController from "../controllers/book_controller";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

// CREATE
router.post("/", verifyToken, async (req, res) =>
  BookController.createBook(req, res)
);

// SEARCH
router.get("/search", async (req, res) => BookController.searchBook(req, res));

// READ
router.get("/:id", async (req, res) => BookController.readBook(req, res));

// UPDATE
router.patch("/:id", verifyToken, async (req, res) =>
  BookController.updateBook(req, res)
);

// DELETE
router.delete("/:id", verifyToken, async (req, res) =>
  BookController.deleteBook(req, res)
);

export default router;
