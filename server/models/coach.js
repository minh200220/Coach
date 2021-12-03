import mongoose from "mongoose";

const coachSchema = mongoose.Schema({
  produceYear: Number,
  brand: String,
  seatNumber: Number,
  status: String,
});

var Coach = mongoose.model("Coach", coachSchema);

export default Coach;
