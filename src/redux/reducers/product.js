const initialValue = {
  productData: [],
  errMsg: [],
  isPending: false,
  isRejected: false,
  isFulfilled: false,
  productall: []
};

const productReducer = (state = initialValue, action) => {
  switch (action.type) {
    //for get product data
    case "GET_PRODUCT_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "GET_PRODUCT_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "GET_PRODUCT_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        productall: action.payload.data.result
      };

    //form post product data
    case "ADD_PRODUCT_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "ADD_PRODUCT_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "ADD_PRODUCT_FULFILLED":
      if (action.payload.data.result) {
        state.productall.unshift(action.payload.data.result);
        return {
          ...state,
          isPending: false,
          isFulfilled: true,
          productall: state.productall
        };
      } else {
        return {
          ...state,
          isPending: false,
          isFulfilled: true,
          productData: "",
          errMsg: action.payload.data.message
        };
      }

    // delete product data
    case "DELETE_PRODUCT_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "DELETE_PRODUCT_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "DELETE_PRODUCT_FULFILLED":
      const dataAfterDelete = state.productall.filter(
        data => data.id.toString() !== action.payload.data.result.id
      );
      // console.log(dataAfterDelete);
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        productall: dataAfterDelete
      };

    //update product data
    case "EDIT_PRODUCT_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "EDIT_PRODUCT_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "EDIT_PRODUCT_FULFILLED":
      const dataAfterEdit = state.productall.map(product => {
        if (product.id.toString() === action.payload.data.result.id) {
          return action.payload.data.result;
        }
        return product;
      });
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        productall: dataAfterEdit
      };

    // pagination
    case "PAGE_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "PAGE_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "PAGE_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        productData: action.payload.data.result
      };

    default:
      return state;
  }
};

export default productReducer;
