import React, { Component, Fragment } from 'react'
import './Category.css'
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'
import axios from 'axios'

class TableCategory extends Component {
    constructor(props) {
        super(props)

        this.state = {
            category: [],
            dataCategory: {
                nama_category: ''
            },
            setShow: false,
            editShow: false,
            id: ''
        }
        this.handleDelete = this.handleDelete.bind(this)
    }






    handleClose = () => {
        this.setState({
            setShow: false,
            editShow: false
        })
    }
    handleShow = (data) => {
        this.setState({
            setShow: true,
            id: data
        })
    }
    handleShowEdit = (data) => {
        let newData = { ...this.state.dataCategory };
        newData.nama_category = data.nama_category;
        this.setState({
            editShow: true,
            dataCategory: newData,
            id: data.id
        })
    }

    handleChange = (e) => {
        let newData = { ...this.state.dataCategory };
        newData[e.target.name] = e.target.value;
        this.setState({
            dataCategory: newData
        })
    }


    handleSave = (data) => {
        const id = this.state.id
        axios.patch(`http://localhost:4001/api/v1/category/${id}`, {
            category: data.nama_category
        }, {
            headers: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                console.log(response)
                window.location.href = "/home/category"
            })
            .catch(err => console.log(err))
    }

    handleDelete = () => {
        const id = this.state.id
        this.setState({
            setShow: false,
        })
        axios.delete(`http://localhost:4001/api/v1/category/${id}`, {
            headers: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                window.location.href = "/home/category"
                console.log(response)
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Fragment>
                <tr>
                    <td>{this.props.data.nama_category}</td>
                    <td>
                        <p className="edit" onClick={() => this.handleShowEdit(this.props.data)}>Edit</p> | <p className="delete" onClick={() => this.handleShow(this.props.data.id)}> Delete</p>
                    </td>
                </tr>


                <Modal show={this.state.setShow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are You Sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Delete the selected item?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
              </Button>
                        <Button variant="danger" onClick={this.handleDelete}>
                            Delete
              </Button>
                    </Modal.Footer>
                </Modal>


                {/* edit */}
                <Modal
                    show={this.state.editShow} onHide={this.handleClose}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>

                            <Form.Group as={Row} controlId="formHorizontalName">
                                <Form.Label column sm={2}>
                                    Name</Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" value={this.state.dataCategory.nama_category} className="txt" name="nama_category" required onChange={this.handleChange} />
                                </Col>
                            </Form.Group>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => this.handleSave(this.state.dataCategory)} > Save</Button>
                        <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal >
            </Fragment>

        )
    }
}

export default TableCategory 