import mongoose from "mongoose";

const routeSchema = mongoose.Schema({
  fromto: String,
  distance: String,
  time: String,
  price: Number,
  coachType: Number,
  departTime: {
    type: [String],
    default: [],
  },
});

var Route = mongoose.model("Route", routeSchema);

export default Route;
