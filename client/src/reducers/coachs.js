import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";

export default (coachs = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...coachs, action.payload];
    case UPDATE:
      return coachs.map((coach) =>
        coach._id === action.payload._id ? action.payload : coach
      );
    case DELETE:
      return coachs.filter((coach) => coach._id !== action.payload);
    default:
      return coachs;
  }
};
