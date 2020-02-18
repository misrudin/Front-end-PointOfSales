import React, { Component, Fragment } from 'react'
import './Category.css'
import TableCategory from './Table'
import { Table, Modal, Button, Form, Col, Row, Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getAllCategory, addCategory, deleteCategory, editCategory } from '../../redux/actions/category.js'
import swal from 'sweetalert'


class AddCategory extends Component {
    state = {
        modalShow: false,
        showEdit: false,
        category: [],
        keyword: '',
        formCategory: {
            id: '',
            category: ''
        },
        msg: '',
        show: false
    }

    handleClose = () => {
        this.setState({
            modalShow: false,
            showEdit: false,
            msg: '',
            show: false
        })
    }

    handleCloseAlert = () => {
        this.setState({
            msg: '',
            show: false
        })
    }


    getCategory = async () => {
        await this.props.dispatch(getAllCategory())
        this.setState({
            category: this.props.category.categoryData
        })
    }

    handleSubmit = () => {
        const data = this.state.formCategory
        if (!/([A-Za-z]{3})\w+/g.test(data.category)) {
            this.setState({
                msg: 'To sort of name!, name must a word',
                show: true
            })
        } else {
            this.props.dispatch(addCategory(data));
            setTimeout(() => {
                this.handleClose()
                this.getCategory()
            }, 100)
            swal("Good job!", "Success add category", "success");
        }
    }

    handleChange = (e) => {
        let newData = { ...this.state.formCategory };
        newData[e.target.name] = e.target.value;
        this.setState({
            formCategory: newData
        })
    }

    handleDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this category!",
            icon: "warning",
            buttons: true,
            dangerMode: true
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.props.dispatch(deleteCategory(id))
                    this.getCategory()
                    swal("Poof! Category has been deleted!", {
                        icon: "success",
                    });
                } else {
                    this.getCategory()
                }
            });
    }

    handleEdit = (data) => {
        let newCategory = { ...this.state.formCategory };
        newCategory.id = data.id;
        newCategory.category = data.nama_category;
        this.setState({
            showEdit: true,
            formCategory: newCategory,
        })
    }

    editOk = () => {
        const data = this.state.formCategory
        if (!/([A-Za-z]{3})\w+/g.test(data.category)) {
            this.setState({
                msg: 'To sort of name!, name must a word',
                show: true
            })
        } else {
            swal({
                title: "Are you sure?",
                text: "you will edit this category!",
                buttons: true
            })
                .then((willEdit) => {
                    if (willEdit) {
                        this.props.dispatch(editCategory(data))
                        setTimeout(() => {
                            this.handleClose()
                            this.getCategory()
                        }, 100)
                        swal("Poof! Category has been updated!", {
                            icon: "success",
                        });
                    } else {
                        this.getCategory()
                    }
                });
        }
    }

    getData = (e) => {
        this.setState({
            keyword: e.target.value
        })
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.getCategory()
        }, 100)
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
                    <Table responsive="m" className="mt-4" striped bordered hover>
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
                                        <TableCategory key={data.id} data={data} delete={this.handleDelete} edit={this.handleEdit} />
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
                <Modal
                    show={this.state.modalShow} onHide={this.handleClose}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Alert variant="danger" show={this.state.show} onClose={this.handleCloseAlert} dismissible>{this.state.msg}</Alert>
                        <Form>
                            <Form.Group as={Row} controlId="formHorizontalName">
                                <Form.Label column sm={2}>
                                    Name</Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" className="txt" name="category" required onChange={this.handleChange} />
                                </Col>
                            </Form.Group>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleSubmit} > Save</Button>
                        <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal >


                {/* edit */}
                <Modal
                    show={this.state.showEdit} onHide={this.handleClose}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Alert variant="danger" show={this.state.show} onClose={this.handleCloseAlert} dismissible>{this.state.msg}</Alert>
                        <Form>

                            <Form.Group as={Row} controlId="formHorizontalName">
                                <Form.Label column sm={2}>
                                    Name</Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" value={this.state.formCategory.category} className="txt" name="category" required onChange={this.handleChange} />
                                </Col>
                            </Form.Group>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => this.editOk(this.state.formCategory)} > Save</Button>
                        <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal >
            </Fragment >
        )
    }
}


const mapStateToProps = ({ category }) => {
    return {
        category
    }
}


export default connect(mapStateToProps)(AddCategory)