import express from "express";
import mongoose from "mongoose";

import Coach from "../models/coach.js";

const router = express.Router();

// https://restapitutorial.com/httpstatuscodes.html

export const getCoachs = async (req, res) => {
  try {
    const coachs = await Coach.find();

    res.status(200).json(coachs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCoach = async (req, res) => {
  const coach = req.body;

  const newCoach = new Coach(coach);

  try {
    await newCoach.save();

    res.status(201).json(newCoach);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateCoach = async (req, res) => {
  const { id: _id } = req.params;
  const coach = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No such coach with that id");

  const updatedCoach = await Coach.findByIdAndUpdate(
    _id,
    { ...coach, _id },
    {
      new: true,
    }
  );

  res.json(updatedCoach);
};

export const deleteCoach = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No coach with id: ${id}`);

  await Coach.findByIdAndRemove(id);

  res.json({ message: "Coach deleted successfully." });
};

export default router;
