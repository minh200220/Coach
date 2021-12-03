import express from "express";

import {
  getRoutes,
  createRoute,
  updateRoute,
  deleteRoute,
} from "../controllers/routes.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getRoutes);
router.post("/", auth, createRoute);
router.patch("/:id", auth, updateRoute);
router.delete("/:id", auth, deleteRoute);

export default router;
