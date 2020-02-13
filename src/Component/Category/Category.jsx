import React, { Component, Fragment } from 'react'
import axios from 'axios'
import './Category.css'
import TableCategory from './Table'
import { Table, Modal, Button, Form, Col, Row } from 'react-bootstrap'


class AddCategory extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalShow: false,
            keyword: '',
            category: [],
            dataCategory: {
                nama_category: ''
            }
        }
    }


    getDataCategory = () => {
        axios.get('http://localhost:4001/api/v1/category', {
            headers: {
                token: localStorage.getItem('Token')
            }
        })
            .then((res) => {
                this.setState({
                    category: res.data.result
                })
            })
    }

    handleChange = (e) => {
        let newData = { ...this.state.dataCategory };
        newData[e.target.name] = e.target.value;
        this.setState({
            dataCategory: newData
        })
    }


    handleSubmit = () => {
        const data = this.state.dataCategory
        axios.post('http://localhost:4001/api/v1/category', {
            category: data.nama_category
        }, {
            headers: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                console.log(response)
                this.handleClose()
            })
            .catch(err => console.log(err))
    }

    componentDidMount = () => {
        this.getDataCategory()
    }

    handleClose = () => {
        this.setState({ modalShow: false })
        this.getDataCategory()
    }
    getData = (e) => {
        const keyword = e.target.value
        this.setState({
            keyword: keyword
        })
    }

    render() {
        let filterData = this.state.category.filter((data) => {
            return data.nama_category.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1;
        })
        return (
            < Fragment >
                <div className="daftar">
                    <Button className="btn btn-info" onClick={() => this.setState({ modalShow: true })}>Add Category</Button>
                    <input type="text" name="keyword" placeholder="Search..." className="keyword" onChange={this.getData} />
                    <Table responsive="m" className="mt-4">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filterData.map(data => {
                                    return (
                                        <TableCategory key={data.id} data={data} />
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
                {/* <ModalCenter show={this.state.modalShow} onHide={this.handleClose} btnSave={() => this.handleSubmit} /> */}
                <Modal
                    show={this.state.modalShow}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group as={Row} controlId="formHorizontalName">
                                <Form.Label column sm={2}>
                                    Name</Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" className="txt" name="nama_category" required onChange={this.handleChange} />
                                </Col>
                            </Form.Group>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={(e) => this.handleSubmit()} > Save</Button>
                        <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal >
            </Fragment >
        )
    }
}

export default AddCategory