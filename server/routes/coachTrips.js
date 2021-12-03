import express from "express";

import {
  getCoachTrips,
  createCoachTrip,
  updateCoachTrip,
  deleteCoachTrip,
} from "../controllers/coachTrips.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getCoachTrips);
router.post("/", auth, createCoachTrip);
router.patch("/:id", auth, updateCoachTrip);
router.delete("/:id", auth, deleteCoachTrip);

export default router;
