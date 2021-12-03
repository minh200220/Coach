import express from "express";
import mongoose from "mongoose";

import CoachTrip from "../models/coachTrip.js";

const router = express.Router();

// https://restapitutorial.com/httpstatuscodes.html

export const getCoachTrips = async (req, res) => {
  try {
    const coachTrips = await CoachTrip.find();

    res.status(200).json(coachTrips);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCoachTrip = async (req, res) => {
  const coachTrip = req.body;

  const newCoachTrip = new CoachTrip(coachTrip);

  try {
    await newCoachTrip.save();

    res.status(201).json(newCoachTrip);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateCoachTrip = async (req, res) => {
  const { id: _id } = req.params;
  const coachTrip = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No such coachTrip with that id");

  const updatedCoachTrip = await CoachTrip.findByIdAndUpdate(
    _id,
    { ...coachTrip, _id },
    {
      new: true,
    }
  );

  res.json(updatedCoachTrip);
};

export const deleteCoachTrip = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No coachTrip with id: ${id}`);

  await CoachTrip.findByIdAndRemove(id);

  res.json({ message: "CoachTrip deleted successfully." });
};

export default router;
