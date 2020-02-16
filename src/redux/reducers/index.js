import { combineReducers } from "redux";
import productReducer from './product'
import categoryReducer from './category'


const reducers = combineReducers({
    product: productReducer,
    category: categoryReducer
});

export default reducers;