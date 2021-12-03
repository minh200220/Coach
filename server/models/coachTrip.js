import mongoose from "mongoose";

const coachTripSchema = mongoose.Schema({
  fromto: String,
  coach: String,
  driver: String,
  date: {
    type: Date,
    default: new Date(),
  },
  time: String,
  seat: Number,
  seatMax: Number,
  passengerNames: {
    type: [String],
    default: [],
  },
  passengerIds: {
    type: [String],
    default: [],
  },
});

var CoachTrip = mongoose.model("CoachTrip", coachTripSchema);

export default CoachTrip;
