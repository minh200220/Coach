import express from "express";
import mongoose from "mongoose";

import Ticket from "../models/ticket.js";

const router = express.Router();

// https://restapitutorial.com/httpstatuscodes.html

export const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();

    res.status(200).json(tickets);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createTicket = async (req, res) => {
  const ticket = req.body;

  const newTicket = new Ticket(ticket);

  try {
    await newTicket.save();

    res.status(201).json(newTicket);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateTicket = async (req, res) => {
  const { id: _id } = req.params;
  const ticket = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No such ticket with that id");

  const updatedTicket = await Ticket.findByIdAndUpdate(
    _id,
    { ...ticket, _id },
    {
      new: true,
    }
  );

  res.json(updatedTicket);
};

export const deleteTicket = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No ticket with id: ${id}`);

  await Ticket.findByIdAndRemove(id);

  res.json({ message: "Ticket deleted successfully." });
};

export default router;
