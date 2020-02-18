import axios from 'axios'

export const getAllProduct = () => {
    return {
        type: "GET_PRODUCT",
        payload: axios.get(process.env.REACT_APP_URL + 'product/all', {
            headers: {
                token: localStorage.getItem('Token')
            }
        })
    }
}
export const addProduct = (fd) => {
    return {
        type: "ADD_PRODUCT",
        payload: axios.post(process.env.REACT_APP_URL + 'product', fd, {
            headers: {
                token: localStorage.getItem('Token')
            }
        })
    }
}
export const deleteProduct = (id) => {
    return {
        type: "DELETE_PRODUCT",
        payload: axios.delete(process.env.REACT_APP_URL + `product/${id}`, {
            headers: {
                token: localStorage.getItem('Token')
            }
        })
    }
}
export const editProduct = (id, fd) => {
    return {
        type: "EDIT_PRODUCT",
        payload: axios.patch(process.env.REACT_APP_URL + `product/${id}`, fd, {
            headers: {
                token: localStorage.getItem('Token')
            }
        })
    }
}

export const pagination = (page, keyword) => {
    return {
        type: "PAGE",
        payload: axios.get(process.env.REACT_APP_URL + `product?page=${page}&keyword=${keyword}`, {
            headers: {
                token: localStorage.getItem('Token')
            }
        })
    }
}


