import React, { Component, Fragment } from 'react'
import './History.css'
import axios from 'axios'
import TableHistory from './Table'
import { Table } from 'react-bootstrap'

class History extends Component {
    constructor(props) {
        super(props)

        this.state = {
            history: [],
            allhistory: []
        }
    }

    getHistory = () => {
        axios.get('http://localhost:4001/api/v1/payment/all', {
            headers: {
                token: localStorage.getItem('Token')
            }
        })
            .then((res) => {
                this.setState({
                    history: res.data.result[0]
                })
            })
    }
    getAllHistory = () => {
        axios.get('http://localhost:4001/api/v1/payment', {
            headers: {
                token: localStorage.getItem('Token')
            }
        })
            .then((res) => {
                this.setState({
                    allhistory: res.data.result
                })
            })
    }

    componentDidMount() {
        if (localStorage.getItem('Token')) {
            this.getHistory()
            this.getAllHistory()
        }
    }

    render() {
        return (
            <Fragment>
                <div className="contain">
                    <div className="kotak1">
                        <p className="head">Today's Income</p>
                        <p className="body">Rp. {this.state.history.INCOME_TODAY}</p>
                        {/* <p className="foot">+2 % Yesterday</p> */}
                    </div>
                    <div className="kotak2">
                        <p className="head">Orders</p>
                        <p className="body">{this.state.history.order_week} </p>
                        {/* <p className="foot">+5% Last Week</p> */}
                    </div>
                    <div className="kotak3">
                        <p className="head">This Year's Income</p>
                        <p className="body">Rp. {this.state.history.year_omzet} </p>
                        {/* <p className="foot">+10% Last year</p> */}
                    </div>
                </div>
                <div className="daftar">
                    <Table responsive="m" className="historyData">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Date</th>
                                <th>Orders</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.allhistory.map(data => {
                                    return (
                                        <TableHistory key={data.id} data={data} />
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </Fragment>
        )
    }
}

export default History