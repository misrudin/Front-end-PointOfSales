const initialValue = {
    categoryData: [],
    errMsg: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false

}


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
                errMsg: action.payload.data.msg
            };
        case "GET_CATEGORY_FULFILLED":
            return {
                ...state,
                isPending: false,
                isFulfilled: true,
                categoryData: action.payload.data.result
            };

        default:
            return state;
    }
}

export default productReducer