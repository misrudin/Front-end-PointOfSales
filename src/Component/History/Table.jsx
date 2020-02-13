import React, { Component, Fragment } from 'react'
// import { Modal, Button, Form, Col, Row } from 'react-bootstrap'
// import axios from 'axios'

class TableHistory extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <Fragment>
                <tr>
                    <td>{this.props.data.username}</td>
                    <td>{this.props.data.date_pay}</td>
                    <td>{this.props.data.name}</td>
                    <td>{this.props.data.total}</td>
                </tr>
            </Fragment>

        )
    }
}

export default TableHistory