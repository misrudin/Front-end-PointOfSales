import React from "react";

import foodres from "../img/silverware.svg";
import clipboard from "../img/attendant-list.svg";
import addbtn from "../img/plus.svg";
import addbtnc from "../img/addc.png";
import logout from "../img/logout.svg";

import { Link } from "react-router-dom";

// import swal from "sweetalert";

export const Sidebar = props => {
  return (
    <>
      <div className="sideBar">
        <div className="menuSide">
          <ul>
            <li>
              <Link to="/pos/product">
                <img src={foodres} alt="menu" width="40px" />
              </Link>
              <p>List</p>
            </li>
            <li>
              <Link to="/pos/history">
                <img src={clipboard} alt="clipboard" width="40px" />
              </Link>
              <p>History</p>
            </li>
            <li>
              <Link to="/pos/product-add">
                <img src={addbtn} alt="addbtn" width="40px" />
              </Link>
              <p>Product</p>
            </li>
            <li>
              <Link to="/pos/category">
                <img src={addbtnc} alt="addbtn" width="40px" />
              </Link>
              <p>Category</p>
            </li>
            <li>
              <img
                src={logout}
                onClick={() => props.onPress()}
                alt="Logout"
                width="40px"
              />
              <p>Logout</p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
