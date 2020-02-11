import React from 'react'
import './Product.css'
import { Button } from 'react-bootstrap'

const TableProduct = (props) => {
    return (
        <tr>
            <td>{props.data.name}</td>
            <td>{props.data.description}</td>
            <td>Rp. {props.data.price}</td>
            <td>{props.data.nama_category}</td>
            <td>{props.data.stok}</td>
            <td>
                <Button className="btn btn-warning mr-1">Edit</Button>
                <Button className="btn btn-danger">Delete</Button>
            </td>
        </tr>
    )
}

export default TableProduct 