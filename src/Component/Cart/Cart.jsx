import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import Items from "./Items";
import picEmpty from "../../img/food-and-restaurant.svg";
import {
  getQty,
  getAllCart,
  deleteCart,
  deleteAll,
  minQty,
  addQty
} from "../../redux/actions/cart";
import { getAllProduct } from "../../redux/actions/product";
import swal from "sweetalert";

const Cart = () => {
  const { cartData } = useSelector(state => state.cart);
  const { productall } = useSelector(state => state.product);
  const [total, settotal] = useState(0);
  const [cart, setCart] = useState(cartData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct());
    getAllCarts();
  }, []);

  useEffect(() => {
    const newTotal = [];
    cart.forEach(e => {
      newTotal.push(e.qty * e.price);
    });
    // const pushTotal = newTotal.reduce((a, b) => a + b, 0);
    settotal(newTotal.reduce((a, b) => a + b, 0));
  }, [cart]);

  const getAllCarts = async () => {
    dispatch(getAllCart()).then(() => {
      setCart(cartData);
      // sendQty();
    });
  };

  const handleMinus = data => {
    const id_cart = data.id;
    const newQty = data.qty - 1;
    if (newQty < 1) {
      dispatch(deleteCart(data.id)).then(() => {
        getAllCarts();
      });
    } else {
      dispatch(minQty(id_cart)).then(() => {});
    }
  };

  const handlePlus = data => {
    const id_cart = data.id;
    productall.forEach(e => {
      if (data.id_product === e.id) {
        if (data.qty >= e.stok) {
          swal("Stok limit!", {
            icon: "warning"
          });
        } else {
          dispatch(addQty(id_cart)).then(() => {
            getAllCarts();
          });
        }
      }
    });
  };

  const handleAll = () => {
    swal({
      title: "Are you sure?",
      text: "Cancel the transaction?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        dispatch(deleteAll()).then(() => {
          getAllCarts();
        });
        swal("Poof! Cart has been deleted!", {
          icon: "success"
        });
      } else {
        getAllCarts();
      }
    });
  };
  return (
    <>
      <div className="covermodal" id="cart">
        <div className="container-cart">
          {cart.length > 0 ? (
            cart.map(data => {
              return (
                <Items
                  key={data.id}
                  data={data}
                  minus={() => handleMinus(data)}
                  plus={() => handlePlus(data)}
                />
              );
            })
          ) : (
            <div className="emptyCart">
              <img src={picEmpty} alt="empty" className="picEmpty" />
              <h5>Your cart is empty</h5>
              <p>Please add some items from the menu</p>
            </div>
          )}
        </div>
        {cartData.length > 0 ? (
          <>
            <div className="footerTotal">
              <p>Total</p> <p>Rp. {total}*</p>
            </div>
            <div className="footerBtn">
              <p>*Belum termasuk ppn</p>
              <Button
                className="btn btn-primary"
                // onClick={() => this.handleCheckout()}
              >
                Checkout
              </Button>
              <Button className="btn btn-danger" onClick={() => handleAll()}>
                Cancel
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Cart;
