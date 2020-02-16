import React, { Component, Fragment } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import './Register.css'
import axios from 'axios'
import { Redirect } from 'react-router-dom'


class Register extends Component {

    state = {
        user: {
            username: '',
            password: '',
            paswordRepeat: ''
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

    handleRegister = (e) => {
        let data = this.state.user
        axios.post('http://localhost:4001/api/v1/auth/Register', data)
            .then((res) => {
                if (!res.data.token) {
                    localStorage.setItem('msg', res.data.msg);
                } else {
                    localStorage.setItem('msg', 'Thank you for using the app.');
                    localStorage.setItem('Token', res.data.token);
                    this.history.push('/home')
                }
            })
    }

    componentDidMount = () => {
        this.setState({
            msg: localStorage.getItem('msg')
        })
    }




    render() {
        if (!localStorage.getItem('Token')) {
            return (
                < Fragment >
                    <div className="main">
                        <div className="Registerarea">
                            <h2 className="title">Register</h2>
                            <Form onSubmit={(e) => this.handleRegister()}>
                                <Form.Group as={Row} controlId="username" className="justify-content-center mt-3">
                                    <Col lg={12}>
                                        <Form.Control type="text" className="txt" name="username" autocomplete="off" required onChange={this.handleChange} placeholder="Username" value={this.state.user.username} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="password" className="justify-content-center mt-3">
                                    <Col lg={12}>
                                        <Form.Control type="password" className="txt" name="password" required onChange={this.handleChange} placeholder="Password" value={this.state.user.password} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="passwordRepeat" className="justify-content-center mt-3">
                                    <Col lg={12}>
                                        <Form.Control type="password" className="txt" name="passwordRepeat" required onChange={this.handleChange} placeholder="Repeat Password" value={this.state.user.passwordRepeat} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="Register" className="justify-content-center mt-5">
                                    <Col lg={6}>
                                        <Button className="form-control btn btn-primary txt" type="submit" name="Register">Register</Button>
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

export default Register;