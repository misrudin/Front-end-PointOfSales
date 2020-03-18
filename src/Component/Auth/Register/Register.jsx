import React, { Component, Fragment } from "react";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import "./Register.css";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import swal from "sweetalert";
import { Loading } from "../../loading";

class Register extends Component {
  state = {
    user: {
      username: "",
      password: "",
      passwordRepeat: "",
      role: "2"
    },
    msg: "",
    show: false,
    loading: false
  };

  handleClose = () => {
    this.setState({
      show: false
    });
  };

  validate = () => {
    const user = this.state.user;
    if (user.username && user.password !== "") {
      if (/^[a-z0-9]{5,12}$/.test(user.username)) {
        this.handleRegister();
      } else {
        this.setState({
          msg: "Username minimal 5 and maximal 12 character!",
          show: true
        });
      }
    } else {
      this.setState({
        msg: "Please Complete data!",
        show: true
      });
    }
  };

  handleChange = e => {
    let newUser = { ...this.state.user };
    newUser[e.target.name] = e.target.value;
    this.setState({
      user: newUser
    });
  };

  postUser = () => {
    this.setState({ loading: true });
    const data = this.state.user;
    axios
      .post(process.env.REACT_APP_URL + `auth/register`, data)
      .then(res => {
        if (!res.data.result) {
          this.setState({
            msg: res.data.msg,
            show: true,
            loading: false
          });
        } else {
          this.continueLogin();
          this.setState({ loading: false });
        }
      })
      .catch(err => {
        this.setState({ loading: false, msg: err, show: true });
      });
  };

  continueLogin = () => {
    swal({
      title: "Good job",
      text: "Your account has been created",
      icon: "success",
      buttons: ["Cancel", "Login"]
    }).then(login => {
      if (login) {
        this.props.history.push("/");
      }
    });
  };

  handleRegister = () => {
    const user = this.state.user;
    if (user.password === user.passwordRepeat) {
      this.setState({ loading: true });
      this.handleClose();
      this.postUser();
    } else {
      this.setState({
        password: "",
        passwordRepeat: "",
        msg: "Password not Match!",
        show: true
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
            <div className="Registerarea">
              <h2 className="title">Register</h2>
              <Alert
                variant="danger"
                show={this.state.show}
                onClose={this.handleClose}
                dismissible
              >
                {this.state.msg}
              </Alert>
              <Form className="form-register">
                <Form.Group
                  as={Row}
                  controlId="username"
                  className="justify-content-center mt-3"
                >
                  <Col lg={12}>
                    <Form.Control
                      type="text"
                      className="txtUsername"
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
                    <Form.Control
                      type="password"
                      className="txtPassword"
                      name="password"
                      required
                      onChange={this.handleChange}
                      placeholder="Password"
                      value={this.state.user.password}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  controlId="passwordRepeat"
                  className="justify-content-center mt-3"
                >
                  <Col lg={12}>
                    <Form.Control
                      type="password"
                      className="txtRepeat"
                      name="passwordRepeat"
                      required
                      onChange={this.handleChange}
                      placeholder="Repeat Password"
                      value={this.state.user.passwordRepeat}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  controlId="Register"
                  className="justify-content-center mt-5"
                >
                  <Col lg={8}>
                    <Button
                      className="form-control btn btn-primary mb-3 txt"
                      onClick={this.validate}
                      name="Register"
                    >
                      Register
                    </Button>
                    <Link to="/login">
                      <p>Back to Login</p>
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

export default Register;
