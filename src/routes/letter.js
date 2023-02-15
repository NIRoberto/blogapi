import express from "express";
import {
  getNewsLetter,
  sendLetter,
  deleteNewsLetter,
} from "../controllers/letterController";
import { Authorization } from "../middleware/Authorization";

const router = express.Router();

router.get("/letters", Authorization, getNewsLetter);
router.post("/letter", sendLetter);
router.delete("/letter/:id", Authorization, deleteNewsLetter);

export default router;
