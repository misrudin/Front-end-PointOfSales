import React from "react";
import cartLogo from "../img/commerce-and-shopping.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Header = () => {
  const { qty } = useSelector(state => state.cart);
  return (
    <div>
      <div className="mynav">
        <div className="menu">
          <Link to="/pos/product">
            <div className="myTitlePage">
              <h3 className="home">POS</h3>
            </div>
          </Link>
        </div>

        <Link to="/pos/product">
          <div className="cart">
            <img
              className="cart-logo"
              onClick={() => this.getAllCart}
              src={cartLogo}
              alt="Cart"
              width="45px"
              height="35px"
            />
            <p className="cartCount">{qty}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
