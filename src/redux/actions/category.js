import axios from 'axios'


export const getAllCategory = () => {
    return {
        type: "GET_CATEGORY",
        payload: axios.get(process.env.REACT_APP_URL + 'category', {
            headers: {
                token: localStorage.getItem('Token')
            }
        })
    }
}