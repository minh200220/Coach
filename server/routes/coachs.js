import express from "express";

import {
  getCoachs,
  createCoach,
  updateCoach,
  deleteCoach,
} from "../controllers/coachs.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getCoachs);
router.post("/", auth, createCoach);
router.patch("/:id", auth, updateCoach);
router.delete("/:id", auth, deleteCoach);

export default router;
