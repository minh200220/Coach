import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";

export default (routes = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...routes, action.payload];
    case UPDATE:
      return routes.map((route) =>
        route._id === action.payload._id ? action.payload : route
      );
    case DELETE:
      return routes.filter((route) => route._id !== action.payload);
    default:
      return routes;
  }
};
