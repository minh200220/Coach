import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
  fromto: String,
  date: {
    type: Date,
    default: new Date(),
  },
  time: String,
  coach: String,
  userId: String,
});

var Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
