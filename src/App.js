import React, { Component, Fragment } from "react";
import "./App.css";
import { Header } from "../src/Component/Header";

import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import swal from "sweetalert";

import { Sidebar } from "./Component/Sidebar";

class App extends Component {
  state = {
    modalShow: false,
    product: [],
    cart: [],
    id_user: "",
    keyword: ""
  };

  handleSearch = e => {
    this.setState({
      keyword: e.target.value
    });
  };

  parseJwt = () => {
    const token = localStorage.getItem("Token");
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function(c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    const decoded = JSON.parse(jsonPayload);
    return decoded.id_user;
  };

  componentDidMount() {
    if (localStorage.getItem("Token")) {
      const id_user = this.parseJwt();
      this.setState({
        id_user: id_user
      });
    } else {
      this.props.history.push("/");
    }
  }

  handleLogout = () => {
    swal({
      text: "Are you sure to logout?",
      dangerMode: true,
      buttons: ["Cancel", "Yes"]
    }).then(logoutOk => {
      if (logoutOk) {
        localStorage.removeItem("Token");
        this.props.history.push("/");
      }
    });
  };

  render() {
    // const qty = this.props.cart.qty;
    if (localStorage.getItem("Token")) {
      return (
        <Fragment>
          <Header />
          <div className="wrapper">
            {/* call children */}
            <Sidebar onPress={() => this.handleLogout()} />
          </div>
        </Fragment>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = ({ cart }) => {
  return {
    cart
  };
};

export default connect(mapStateToProps)(App);
