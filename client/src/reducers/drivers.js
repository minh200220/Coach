import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";

export default (drivers = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...drivers, action.payload];
    case UPDATE:
      return drivers.map((driver) =>
        driver._id === action.payload._id ? action.payload : driver
      );
    case DELETE:
      return drivers.filter((driver) => driver._id !== action.payload);
    default:
      return drivers;
  }
};
