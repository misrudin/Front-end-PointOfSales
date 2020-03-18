import axios from "axios";

export const getAllCategory = () => {
  return {
    type: "GET_CATEGORY",
    payload: axios.get(process.env.REACT_APP_URL + "category", {
      headers: {
        token: localStorage.getItem("Token")
      }
    })
  };
};

export const addCategory = data => {
  return {
    type: "ADD_CATEGORY",
    payload: axios.post(process.env.REACT_APP_URL + "category", data, {
      headers: {
        token: localStorage.getItem("Token")
      }
    })
  };
};
export const deleteCategory = id => {
  return {
    type: "DELETE_CATEGORY",
    payload: axios.delete(process.env.REACT_APP_URL + `category/${id}`, {
      headers: {
        token: localStorage.getItem("Token")
      }
    })
  };
};
export const editCategory = data => {
  return {
    type: "EDIT_CATEGORY",
    payload: axios.patch(
      process.env.REACT_APP_URL + `category/${data.id}`,
      data,
      {
        headers: {
          token: localStorage.getItem("Token")
        }
      }
    )
  };
};
