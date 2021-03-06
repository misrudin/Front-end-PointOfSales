import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import Cart from "./Component/Cart/Cart";
import History from "./Component/History/History";
import Product from "./Component/Product/Product";
import Content from "./Component/Content/Content";
import Category from "./Component/Category/Category";
import Register from "./Component/Auth/Register/Register";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Component/Auth/Auth";
import Splash from "./Component/Auth/Splash";
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import store from "./redux/store";

const Routing = () => {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact component={Splash} />
        <Route path="/login" exact component={Login} />
        <Route path="/pos" component={App} />
        <div className="wrapper" id="wrapper">
          {/* call children */}
          <Route path="/pos/product" component={Content} />
          <Route path="/pos/history" component={History} />
          <Route path="/pos/product-add" component={Product} />
          <Route path="/pos/category" component={Category} />
          {/* <Route path="/pos/cart" component={Cart} /> */}
        </div>
        <Route path="/register" component={Register} />
      </Router>
    </Provider>
  );
};

ReactDOM.render(<Routing />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
