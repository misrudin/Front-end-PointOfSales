const initialValue = {
    userData: []
}

const authReducer = (state = initialValue, action) => {
    switch (action.type) {
        case 'GET_USER':
            return {
                ...state,
                userData: state.userData + action.payload
            }

        default:
            return {
                state
            }
    }
}


export default authReducer;