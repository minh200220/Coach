import { combineReducers } from "redux";

import coachs from "./coachs";
import coachTrips from "./coachTrips";
import drivers from "./drivers";
import routes from "./routes";
import tickets from "./tickets";
import auth from "./auth";

export const reducers = combineReducers({
  coachs,
  coachTrips,
  drivers,
  routes,
  tickets,
  auth,
});
