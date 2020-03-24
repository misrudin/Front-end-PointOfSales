import axios from "axios";

export const getAllCart = () => {
  return {
    type: "GET_CART",
    payload: axios.get(process.env.REACT_APP_URL + `cart`, {
      headers: {
        token: localStorage.getItem("Token")
      }
    }),
    payloadQty: axios.get(process.env.REACT_APP_URL + `cart/qty`, {
      headers: {
        token: localStorage.getItem("Token")
      }
    })
  };
};

export const addProductToCart = data => {
  return {
    type: "ADD_CART",
    payload: axios.post(process.env.REACT_APP_URL + "cart", data, {
      headers: {
        token: localStorage.getItem("Token")
      }
    })
  };
};

export const checkOutAll = data => {
  return {
    type: "CHECKOUT",
    payload: axios.post(process.env.REACT_APP_URL + "cart/checkout", data, {
      headers: {
        token: localStorage.getItem("Token")
      }
    })
  };
};

export const deleteAll = () => {
  return {
    type: "DELETEALL",
    payload: axios.delete(process.env.REACT_APP_URL + "cart/all", {
      headers: {
        token: localStorage.getItem("Token")
      }
    })
  };
};

export const deleteCart = id_cart => {
  return {
    type: "DELETECART",
    payload: axios.delete(
      process.env.REACT_APP_URL + `cart?id_cart=${id_cart}`,
      {
        headers: {
          token: localStorage.getItem("Token")
        }
      }
    )
  };
};

export const getDetail = faktur => {
  return {
    type: "DETAIL",
    payload: axios.get(process.env.REACT_APP_URL + `payment?faktur=${faktur}`, {
      headers: {
        token: localStorage.getItem("Token")
      }
    })
  };
};

export const addQty = id_cart => {
  return {
    type: "ADDQTY",
    payload: axios.patch(process.env.REACT_APP_URL + `cart/add/${id_cart}`, {
      headers: {
        token: localStorage.getItem("Token")
      }
    })
  };
};
export const minQty = id_cart => {
  return {
    type: "MINQTY",
    payload: axios.patch(process.env.REACT_APP_URL + `cart/min/${id_cart}`, {
      headers: {
        token: localStorage.getItem("Token")
      }
    })
  };
};

export const getQty = qty => {
  return {
    type: "QTY",
    payload: qty
  };
};

export const detail = qty => {
  return {
    type: "ALL_DETAIL",
    payload: axios.get(process.env.REACT_APP_URL + `payment/detailall`, {
      headers: {
        token: localStorage.getItem("Token")
      }
    })
  };
};
