import React, { useState, useEffect } from "react";
import "./Product.css";
import oke from "../../../img/oke.svg";
import emptystok from "../../../img/empty.png";
import buy from "../../../img/icons8-buy-96.png";

const Product = props => {
  const [muncul, setMuncul] = useState(false);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const addToCart = data => {
    setLoading(true);
    props.addToCart(data);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    setCart(props.dataCart);
  }, [props.dataCart]);

  useEffect(() => {
    const arr = [];
    cart.map(idp => {
      return arr.push(idp.id_product);
    });
    const cek = (element, index, array) => {
      return element === props.data.id;
    };
    const sm = () => {
      const val = arr.some(cek);
      if (val) {
        setMuncul(true);
      } else {
        setMuncul(false);
      }
    };

    sm();
  }, [cart, props.data.id]);
  
  return (
    <div
      className="item"
      onClick={
        props.data.stok === 0
          ? null
          : muncul
          ? null
          : () => addToCart(props.data)
      }
    >
      {loading ? (
        <div className="loadingContainer2">
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      ) : null}
      <img className="imgProduct" src={props.data.image} alt="imgProduct" />
      <div className="detail">
        <span className="name"> {props.data.name} </span>
        <span className="price">Rp. {props.data.price} </span>
      </div>
      {props.data.stok === 0 ? (
        <div className="emptyContainer">
          <img src={emptystok} alt="Empty" className="oke" />
          {/* <p>Empty Stok</p> */}
        </div>
      ) : muncul ? (
        <div className="okeContainer">
          <img src={oke} alt="Oke" className="oke" />
        </div>
      ) : (
        <div className="buyContainer">
          <img src={buy} alt="Buy" className="buy" />
        </div>
      )}
    </div>
  );
};

export default Product;
