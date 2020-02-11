import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Content from './Component/Content/Content';
import History from './Component/History/History';
import Product from './Component/Product/Product';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './Component/Auth/Auth'
import 'bootstrap/dist/css/bootstrap.min.css';


class Routing extends React.Component {
    render() {
        return (
            <Router>
                <Route path="/" exact component={Login} />
                <Route path="/home" component={App} />
                <Route path="/home/product" component={Content} />
                <Route path="/home/history" component={History} />
                <Route path="/home/product-add" component={Product} />
            </Router>
        )
    }
}

ReactDOM.render(<Routing />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
