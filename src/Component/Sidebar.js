import React, { useState } from "react";

import foodres from "../img/silverware.svg";
import clipboard from "../img/attendant-list.svg";
import addbtn from "../img/plus.svg";
import addbtnc from "../img/add.svg";
import logout from "../img/logout.svg";

import { Redirect, Link } from "react-router-dom";

import swal from "sweetalert";

export const Sidebar = props => {
  const [modalShow, setModalShow] = useState("false");

  return (
    <>
      <div className="sideBar">
        <div className="menuSide">
          <ul>
            <li>
              <Link to="/pos/product">
                <img src={foodres} alt="menu" width="40px" />
              </Link>
              <p>Product</p>
            </li>
            <li>
              <Link to="/pos/history">
                <img src={clipboard} alt="clipboard" width="40px" />
              </Link>
              <p>History</p>
            </li>
            <li>
              <Link to="/pos/product-add">
                <img
                  src={addbtn}
                  alt="addbtn"
                  width="40px"
                  onClick={() => setModalShow(true)}
                />
              </Link>
              <p>Add Product</p>
            </li>
            <li>
              <Link to="/pos/category">
                <img
                  src={addbtnc}
                  alt="addbtn"
                  width="40px"
                  onClick={() => setModalShow(true)}
                />
              </Link>
              <p>Add Category</p>
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
