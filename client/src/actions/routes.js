import * as api from "../api/index.js";
import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";

export const getRoutes = () => async (dispatch) => {
  try {
    const { data } = await api.fetchRoutes();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createRoute = (route) => async (dispatch) => {
  try {
    const { data } = await api.createRoute(route);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateRoute = (id, route) => async (dispatch) => {
  try {
    const { data } = await api.updateRoute(id, route);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteRoute = (id) => async (dispatch) => {
  try {
    await api.deleteRoute(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
