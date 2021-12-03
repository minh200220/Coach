import express from "express";
import mongoose from "mongoose";

import Route from "../models/route.js";

const router = express.Router();

// https://restapitutorial.com/httpstatuscodes.html

export const getRoutes = async (req, res) => {
  try {
    const routes = await Route.find();

    res.status(200).json(routes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createRoute = async (req, res) => {
  const route = req.body;

  const newRoute = new Route(route);

  try {
    await newRoute.save();

    res.status(201).json(newRoute);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateRoute = async (req, res) => {
  const { id: _id } = req.params;
  const route = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No such route with that id");

  const updatedRoute = await Route.findByIdAndUpdate(
    _id,
    { ...route, _id },
    {
      new: true,
    }
  );

  res.json(updatedRoute);
};

export const deleteRoute = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No route with id: ${id}`);

  await Route.findByIdAndRemove(id);

  res.json({ message: "Route deleted successfully." });
};

export default router;
