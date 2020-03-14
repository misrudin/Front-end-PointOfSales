import React, { useEffect } from "react";
// import Login from "./Auth";
import "./splash.css";

const Splash = ({ history }) => {
  useEffect(() => {
    setTimeout(() => {
      history.push("/Login");
    }, 2000);
  });
  return (
    <div className="container">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Splash;
