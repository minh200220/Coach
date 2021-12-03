import express from "express";

import {
  getDrivers,
  createDriver,
  updateDriver,
  deleteDriver,
} from "../controllers/drivers.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getDrivers);
router.post("/", auth, createDriver);
router.patch("/:id", auth, updateDriver);
router.delete("/:id", auth, deleteDriver);

export default router;
