import React from "react";
import cartLogo from "../img/commerce-and-shopping.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Header = () => {
  const { qty } = useSelector(state => state.cart);

  const showCart = () => {
    const cartcover = document.querySelector(".cover");
    const content = document.getElementById("content");
    const aa = document.getElementById("items");
    // alert(window.innerWidth);
    if (cartcover.style.display === "none") {
      cartcover.style.display = "block";
      cartcover.style.transition = "0.5s";
      if (window.innerWidth > 1200) {
        content.style.width = "calc(100% - 325px)";
        aa.style.width = "calc(100% - 80px)";
        aa.style.gridTemplateColumns = "repeat(3, minmax(200px, 1fr))";
      }
    } else {
      if (window.innerWidth > 1200) {
        content.style.width = "100%";
        aa.style.width = "calc(100% - 80px)";
        aa.style.gridTemplateColumns = "repeat(4, minmax(200px, 1fr))";
      }
      cartcover.style.display = "none";
    }
  };

  return (
    <div>
      <div className="mynav">
        <div className="menu">
          <Link to="/pos/product">
            <div className="myTitlePage">
              <h3 className="home">Hayuu</h3>
            </div>
          </Link>
        </div>

        <div className="cart" onClick={() => null}>
          <p className="cartCount">Cart({qty})</p>
        </div>
      </div>
    </div>
  );
};
