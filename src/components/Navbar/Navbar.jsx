import React, { useReducer } from "react";
import "./navbar.css";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import { authInitialState, authReducer } from "../../reducers/auth";
import * as actions from "../../actionTypes/actionTypes";

const Navbar = () => {
  const { user } = JSON.parse(localStorage.getItem("profile"));
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);

  return (
    <div className="navbar section__padding">
      <h2> Hi, {user}</h2>

      <div>
        <div
          className="profile"
          onClick={() => {
            authDispatch({ type: actions.LOGOUT });
            window.location.reload();
          }}
        >
          <PowerSettingsNewOutlinedIcon />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
