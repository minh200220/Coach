import mongoose from "mongoose";

const driverSchema = mongoose.Schema({
  name: String,
  dob: {
    type: Date,
    default: new Date(),
  },
  licenseNo: String,
  licenseClass: String,
  seatMax: Number,
  familiarRoutes: {
    type: [String],
    default: [],
  },
});

var Driver = mongoose.model("Driver", driverSchema);

export default Driver;
