import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import Content from './Component/Content/Content';
import History from './Component/History/History';
import Product from './Component/Product/Product';
import Content from './Component/Content/Content';
import Category from './Component/Category/Category';
import Register from './Component/Auth/Register/Register';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './Component/Auth/Auth'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux'
import store from './redux/store'

const Routing = () => {
    return (
        <Provider store={store}>
            <Router>
                <Route path="/" exact component={Login} />
                <Route path="/home" component={App} />
                <Route path="/home/product" component={Content} />
                <Route path="/home/history" component={History} />
                <Route path="/home/product-add" component={Product} />
                <Route path="/home/category" component={Category} />
                <Route path="/register" component={Register} />
            </Router>
        </Provider >
    )
}



ReactDOM.render(<Routing />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
