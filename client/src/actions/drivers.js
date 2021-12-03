import * as api from "../api/index.js";
import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";

export const getDrivers = () => async (dispatch) => {
  try {
    const { data } = await api.fetchDrivers();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createDriver = (driver) => async (dispatch) => {
  try {
    const { data } = await api.createDriver(driver);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateDriver = (id, driver) => async (dispatch) => {
  try {
    const { data } = await api.updateDriver(id, driver);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteDriver = (id) => async (dispatch) => {
  try {
    await api.deleteDriver(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
