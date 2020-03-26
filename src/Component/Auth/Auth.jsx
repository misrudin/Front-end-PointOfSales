import React, { Component, Fragment } from "react";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import "./Auth.css";
import "./splash.css";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import { Loading } from "../loading";

class Login extends Component {
  state = {
    user: {
      username: "",
      password: ""
    },
    msg: "",
    isLogin: false,
    show: false,
    loading: false
  };

  handleClose = () => {
    this.setState({
      show: false
    });
  };

  handleChange = e => {
    let newUser = { ...this.state.user };
    newUser[e.target.name] = e.target.value;
    this.setState({
      user: newUser
    });
  };

  handleLogin = e => {
    let data = this.state.user;
    if (data) {
      this.setState({ loading: true });
      axios.post(process.env.REACT_APP_URL + `auth/login`, data).then(res => {
        if (!res.data.token) {
          this.setState({
            msg: res.data.msg,
            show: true,
            loading: false
          });
        } else {
          localStorage.setItem("Token", res.data.token);
          this.setState({ isLogin: true });
          this.setState({ loading: false });
          this.props.history.push("/pos/product");
        }
      });
    } else {
      this.setState({
        msg: "Can't be null"
      });
    }
  };

  componentDidMount() {
    if (localStorage.getItem("Token")) {
      this.props.history.push("/pos/product");
    }
  }

  render() {
    if (!localStorage.getItem("Token")) {
      return (
        <Fragment>
          <div className="main">
            <div className="bg"></div>
            <div className="loginarea">
              <h2 className="title">Sign In</h2>
              <Alert
                variant="danger"
                show={this.state.show}
                onClose={this.handleClose}
                dismissible
              >
                {this.state.msg}
              </Alert>
              <Form>
                <Form.Group
                  as={Row}
                  controlId="username"
                  className="justify-content-center mt-4"
                >
                  <Col lg={12}>
                    <input
                      type="text"
                      className="txtr"
                      name="username"
                      required
                      onChange={this.handleChange}
                      placeholder="Username"
                      value={this.state.user.username}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  controlId="password"
                  className="justify-content-center mt-3"
                >
                  <Col lg={12}>
                    <input
                      type="password"
                      className="txtr"
                      name="password"
                      required
                      onChange={this.handleChange}
                      placeholder="Password"
                      value={this.state.user.password}
                      onKeyPress={e =>
                        e.key === "Enter" ? this.handleLogin() : null
                      }
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  controlId="login"
                  className="justify-content-center mt-4"
                >
                  <Col lg={8}>
                    <Button
                      className="form-control btn btn-lgn txtr mb-3"
                      onClick={e => this.handleLogin()}
                      name="login"
                    >
                      Login
                    </Button>
                    <Link to="/register">
                      <p>Register</p>
                    </Link>
                  </Col>
                </Form.Group>
              </Form>
            </div>
          </div>
          {this.state.loading ? <Loading /> : null}
        </Fragment>
      );
    } else {
      return <Redirect to="/pos/product" />;
    }
  }
}

export default Login;
