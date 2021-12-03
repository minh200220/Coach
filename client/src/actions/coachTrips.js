import * as api from "../api/index.js";
import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";

export const getCoachTrips = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCoachTrips();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createCoachTrip = (coachTrip) => async (dispatch) => {
  try {
    const { data } = await api.createCoachTrip(coachTrip);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateCoachTrip = (id, coachTrip) => async (dispatch) => {
  try {
    const { data } = await api.updateCoachTrip(id, coachTrip);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCoachTrip = (id) => async (dispatch) => {
  try {
    await api.deleteCoachTrip(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
