import * as api from "../api/index.js";
import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";

export const getCoachs = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCoachs();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createCoach = (coach) => async (dispatch) => {
  try {
    const { data } = await api.createCoach(coach);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateCoach = (id, coach) => async (dispatch) => {
  try {
    const { data } = await api.updateCoach(id, coach);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCoach = (id) => async (dispatch) => {
  try {
    await api.deleteCoach(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
