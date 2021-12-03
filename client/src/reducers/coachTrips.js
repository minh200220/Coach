import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";

export default (coachTrips = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...coachTrips, action.payload];
    case UPDATE:
      return coachTrips.map((coachTrip) =>
        coachTrip._id === action.payload._id ? action.payload : coachTrip
      );
    case DELETE:
      return coachTrips.filter((coachTrip) => coachTrip._id !== action.payload);
    default:
      return coachTrips;
  }
};
