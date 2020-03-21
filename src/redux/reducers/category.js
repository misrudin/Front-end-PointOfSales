const initialValue = {
  categoryData: [],
  errMsg: [],
  isPending: false,
  isRejected: false,
  isFulfilled: false
};

const productReducer = (state = initialValue, action) => {
  switch (action.type) {
    //for get category data
    case "GET_CATEGORY_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "GET_CATEGORY_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "GET_CATEGORY_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        categoryData: action.payload.data.result
      };

    // add cactegory
    case "ADD_CATEGORY_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "ADD_CATEGORY_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "ADD_CATEGORY_FULFILLED":
      state.categoryData.push(action.payload.data.result);
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        categoryData: state.categoryData
      };

    //delete category
    case "DELETE_CATEGORY_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "DELETE_CATEGORY_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "DELETE_CATEGORY_FULFILLED":
      const dataAfterDelete = state.categoryData.filter(
        data => data.id.toString() !== action.payload.data.result.id
      );
      // console.log(dataAfterDelete);
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        categoryData: dataAfterDelete
      };

    // edit category
    case "EDIT_CATEGORY_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "EDIT_CATEGORY_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "EDIT_CATEGORY_FULFILLED":
      const dataAfterEdit = state.categoryData.map(data => {
        if (data.id.toString() === action.payload.data.result.id) {
          return action.payload.data.result;
        }
        return data;
      });
      // console.log(dataAfterEdit);
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        categoryData: dataAfterEdit
      };

    default:
      return state;
  }
};

export default productReducer;
