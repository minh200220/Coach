import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import coachRoutes from "./routes/coachs.js";
import coachTripRoutes from "./routes/coachTrips.js";
import driverRoutes from "./routes/drivers.js";
import routeRoutes from "./routes/routes.js";
import ticketRoutes from "./routes/tickets.js";
import userRoutes from "./routes/user.js";

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/coachs", coachRoutes);
app.use("/coachtrips", coachTripRoutes);
app.use("/drivers", driverRoutes);
app.use("/routes", routeRoutes);
app.use("/tickets", ticketRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Coach Managerment System API server");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
  )
  .catch((e) => console.log(e.message));

mongoose.set("useFindAndModify", false);
