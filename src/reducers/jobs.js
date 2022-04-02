import * as actionType from "../actionTypes/actionTypes";

export const jobsInitialState = [];
export const jobsReducer = (state, action) => {
  switch (action.type) {
    case actionType.GET_JOBS:
      return action.payload;

    case actionType.CREATE_JOB:
      return [...state, action.payload];

    case actionType.GET_JOB:
      return action.payload;

    case actionType.DELETE_JOB:
      return [...state.filter((job) => job._id !== action.payload._id)];

    default:
      return state;
  }
};
