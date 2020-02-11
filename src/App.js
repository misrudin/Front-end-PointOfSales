import React, { Component, Fragment, createContext } from 'react';
import './App.css'
import menuLogo from './img/menu.svg'
import cartLogo from './img/commerce-and-shopping.svg'
import foodres from '../src/img/silverware.svg'
import clipboard from '../src/img/attendant-list.svg'
import addbtn from '../src/img/plus.svg'
import logout from '../src/img/logout.svg'
import { Redirect, Link } from "react-router-dom";
import axios from 'axios'

export const RootContext = createContext()
const Provider = RootContext.Provider

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalShow: false,
      product: [],
      cart: [],
      id_user: '',
      qty: 0,
    }
  }

  handleLogout = () => {
    localStorage.removeItem('Token')
    window.location.href = "/"
  }

  alo = () => {
    const side = document.querySelector('.sideBar')
    const items = document.querySelector('.items')
    if (side.classList.contains('sidebarLeft')) {
      side.classList.remove('sidebarLeft');
      items.classList.remove('contentSlide');
    } else {
      side.classList.add('sidebarLeft');
      items.classList.add('contentSlide');
    }
  }


  parseJwt = () => {
    const token = localStorage.getItem('Token')
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const decoded = JSON.parse(jsonPayload);
    return decoded.id_user
  };

  getAllCart = () => {
    const id_user = this.state.id_user
    axios.get(`http://localhost:4001/api/v1/cart/${id_user}`, {
      headers: {
        token: localStorage.getItem('Token')
      }
    })
      .then((res) => {
        this.setState({
          cart: res.data.result
        }, () => {
          const cart = this.state.cart
          const newQty = []
          cart.forEach((e) => {
            newQty.push(e.qty)
          })
          this.setState({
            qty: newQty.reduce((a, b) => a + b, 0)
          })
        })
      })
  }

  componentDidMount() {
    console.log(this.props)
    const id_user = this.parseJwt()
    this.setState({
      id_user: id_user
    }, () => {
      this.getAllCart()
    })
  }


  render() {
    // console.log(this.parseJwt())
    if (localStorage.getItem('Token')) {
      return (
        <Provider value={this.state}>
          <Fragment>
            <div className="mynav">
              <div className="menu">
                <img src={menuLogo} alt="Menu" width="40px" onClick={this.alo} />
              </div>
              <Link to="/home">
                <div className="myTitlePage" >
                  <h3>{this.props.title}</h3>
                </div>
              </Link>

              <Link to="/cart">
                <div className="cart">
                  <img className="cart-logo" onClick={() => this.getAllCart} src={cartLogo} alt="Cart" width="35px" />
                  <p className="cartCount">{this.state.qty}</p>
                </div>
              </Link>
            </div>

            <div className="wrapper">
              <div className="sideBar">
                <div className="menuSide">
                  <ul>
                    <li>
                      <Link to="/home/Product">
                        <img src={foodres} alt="menu" width="40px" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/home/history">
                        <img src={clipboard} alt="clipboard" width="40px" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/home/product-add">
                        <img src={addbtn} alt="addbtn" width="40px" onClick={() => this.setState({ modalShow: true })} />
                      </Link>
                    </li>
                    <li>
                      <img src={logout} onClick={() => this.handleLogout()} alt="Logout" width="40px" />
                    </li>
                  </ul>
                </div>
              </div>
              {/* call children */}

            </div>
          </Fragment>
        </Provider >
      )
    } else {
      return <Redirect to="/" />
    }
  }

}

export default App;
