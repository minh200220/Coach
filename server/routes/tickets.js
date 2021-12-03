import express from "express";

import {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/tickets.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getTickets);
router.post("/", createTicket);
router.patch("/:id", auth, updateTicket);
router.delete("/:id", auth, deleteTicket);

export default router;
