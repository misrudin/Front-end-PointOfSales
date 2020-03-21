const initialValue = {
  cartData: [],
  errMsg: [],
  isPending: false,
  isRejected: false,
  isFulfilled: false,
  qty: 0,
  cartDetail: []
};

const cartReducer = (state = initialValue, action) => {
  switch (action.type) {
    //for get cart data
    case "GET_CART_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "GET_CART_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "GET_CART_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        cartData: action.payload.data.result
      };

    //add product to cart
    case "ADD_CART_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "ADD_CART_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload
      };
    case "ADD_CART_FULFILLED":
      state.cartData.push(action.payload.data.result);
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        cartData: state.cartData
      };

    // count qty
    case "QTY":
      return {
        ...state,
        qty: action.payload
      };

    // checkout all
    case "CHECKOUT_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "CHECKOUT_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "CHECKOUT_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true
      };

    //delete all cart
    case "DELETEALL_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "DELETEALL_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "DELETEALL_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        cartData: []
      };

    //detail cart
    case "DETAIL_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "DETAIL_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "DETAIL_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        cartDetail: action.payload.data.result
      };

    //add qty
    case "ADDQTY_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "ADDQTY_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "ADDQTY_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        qty: state.qty + 1
      };

    // minus qty
    case "MINQTY_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "MINQTY_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "MINQTY_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        qty: state.qty - 1
      };

    // delete cart 1
    case "DELETECART_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "DELETECART_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "DELETECART_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        cartData: state.cartData
      };
    default:
      return state;
  }
};

export default cartReducer;
