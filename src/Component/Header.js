import React from "react";
import bar from "../img/bar.svg";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Header = props => {
  const { qty, isPending } = useSelector(state => state.cart);

  return (
    <div>
      <div className="mynav">
        <div className="menu">
          <img src={bar} alt="menu" width="40px" className="bar" id="bar" />
          <div className="searchForm">
            <Form>
              <input
                type="text"
                className="txtSearch"
                placeholder="Search ..."
                name="q"
              />
            </Form>
          </div>
        </div>

        <div className="cartNav">
          <Link to="/pos/product">
            <p className="cartCount" id="count">
              Cart({qty})
            </p>
          </Link>
          <p className="cartCountbig">Cart({qty})</p>

          {isPending ? (
            <div className="loadingCat">
              <div className="lds-hourglass"></div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
