import React from "react";
import "./Auth/splash.css";
import "./Auth/Auth.css";

export const Loading = () => {
  return (
    <div className="con">
      <div className="loading">
        {/* <div class="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div> */}
        {/* <div class="lds-circle">
          <div></div>
        </div> */}
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
