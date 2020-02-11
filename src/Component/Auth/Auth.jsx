import React, { Component, Fragment } from 'react'
import { Form, Button, Col, Row, Alert } from 'react-bootstrap'
import './Auth.css'
import axios from 'axios'
import { Redirect } from 'react-router-dom'


class Login extends Component {
    state = {
        user: {
            username: '',
            password: ''
        },
        msg: ''
    }


    handleChange = (e) => {
        let newUser = { ...this.state.user };
        newUser[e.target.name] = e.target.value;
        this.setState({
            user: newUser
        })
    }

    handleLogin = (e) => {
        let data = this.state.user
        axios.post('http://localhost:4001/api/v1/auth/login', data)
            .then((res) => {
                if (!res.data.token) {
                    this.setState({ msg: res.data.msg })
                    document.querySelector('.alert').style.display = 'block'
                } else {
                    localStorage.setItem('Token', res.data.token);
                    this.history.push()
                }
            })
    }





    render() {
        if (!localStorage.getItem('Token')) {
            return (
                < Fragment >
                    <div className="main">
                        <div className="loginarea">
                            <h2 className="title">Login</h2>
                            <Alert key="warning" variant="warning" className='alert'>{this.state.msg}</Alert>
                            <Form>
                                <Form.Group as={Row} controlId="username" className="justify-content-center mt-5">
                                    <Col lg={8}>
                                        <Form.Control type="text" className="txt" name="username" required onChange={this.handleChange} placeholder="Username" value={this.state.user.username} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="password" className="justify-content-center mt-3">
                                    <Col lg={8}>
                                        <Form.Control type="password" className="txt" name="password" required onChange={this.handleChange} placeholder="Password" value={this.state.user.password} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="login" className="justify-content-center mt-4">
                                    <Col lg={6}>
                                        <Button className="form-control btn btn-primary txt" onClick={(e) => this.handleLogin()} type="submit" name="login">Login</Button>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                </Fragment>
            )
        } else {
            return <Redirect to="/home/product" />
        }
    }
}

export default Login;