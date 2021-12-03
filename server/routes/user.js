import express from "express";
const router = express.Router();

import { getUsers, signin, signup, updateUser } from "../controllers/users.js";

router.get("/", getUsers);
router.patch("/:id", updateUser);
router.post("/signin", signin);
router.post("/signup", signup);

export default router;
