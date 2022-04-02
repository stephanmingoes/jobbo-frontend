import * as actionType from "../actionTypes/actionTypes";

export const authInitialState = {};
export const authReducer = (state, action) => {
  switch (action.type) {
    case actionType.LOGIN:
      localStorage.setItem("profile", JSON.stringify(action?.payload));
      return { ...state, authData: action?.payload };
    case actionType.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};
