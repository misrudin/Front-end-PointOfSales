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
        axios.get(process.env.REACT_APP_URL + `payment/all`, {
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
        axios.get(process.env.REACT_APP_URL + `payment`, {
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

    // UP
    incomeToday = () => {
        const history = this.state.history
        if (history.INCOME_TODAY > history.Yesterday) {
            const yesterday = ((history.INCOME_TODAY - history.Yesterday) / history.INCOME_TODAY * 100 * 100 / 100)
            return +yesterday;
        } else if (history.INCOME_TODAY < history.Yesterday) {
            const yesterday = ((history.Yesterday - history.INCOME_TODAY) / history.Yesterday * 100 * 100 / 100)
            return -yesterday;
        } else {
            return 0;
        }
    }

    orderWeek = () => {
        const history = this.state.history
        if (history.order_week > history.last_week) {
            const order = ((history.order_week - history.last_week) / history.order_week * 100 * 100 / 100)
            return +order;
        } else if (history.order_week < history.last_week) {
            const order = ((history.last_week - history.order_week) / history.last_week * 100 * 100 / 100)
            return -order;
        } else {
            return 0;
        }
    }

    incomeYear = () => {
        const history = this.state.history
        if (history.year_omzet > history.last_year) {
            const year = ((history.year_omzet - history.last_year) / history.year_omzet * 100 * 100 / 100)
            return +year;
        } else if (history.year_omzet < history.last_year) {
            const year = ((history.last_year - history.year_omzet) / history.last_year * 100 * 100 / 100)
            return -year;
        } else {
            return 0;
        }
    }

    render() {
        const yesterday = Math.round(this.incomeToday())
        const order = Math.round(this.orderWeek())
        const year = Math.round(this.incomeYear())

        return (
            <Fragment>
                <div className="contain">
                    <div className="kotak1">
                        <p className="head">Today's Income</p>
                        <p className="body">Rp. {this.state.history.INCOME_TODAY}</p>
                        <p className="foot">{yesterday} % Yesterday</p>
                    </div>
                    <div className="kotak2">
                        <p className="head">Orders</p>
                        <p className="body">{this.state.history.order_week} </p>
                        <p className="foot">{order} % Last Week</p>
                    </div>
                    <div className="kotak3">
                        <p className="head">This Year's Income</p>
                        <p className="body">Rp. {this.state.history.year_omzet} </p>
                        <p className="foot">{year} % Last year</p>
                    </div>
                </div>
                <div className="daftar">
                    <Table responsive="m" className="historyData">
                        <thead>
                            <tr>
                                <th>Invoices</th>
                                <th>Cashier</th>
                                <th>Date</th>
                                <th>Orders</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.allhistory.map(data => {
                                    return (
                                        <TableHistory key={data.faktur} data={data} />
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