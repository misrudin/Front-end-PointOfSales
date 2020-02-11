import React, { Component, Fragment, createContext } from 'react';
import './App.css'
import menuLogo from './img/menu.svg'
import srcLogo from './img/search.svg'
import cartLogo from './img/commerce-and-shopping.svg'
import foodres from '../src/img/silverware.svg'
import clipboard from '../src/img/attendant-list.svg'
import addbtn from '../src/img/plus.svg'
import logout from '../src/img/logout.svg'
import { Redirect, Link } from "react-router-dom";

export const RootContext = createContext()
const Provider = RootContext.Provider

class App extends Component {
  state = {
    modalShow: false,
    product: []
  }

  handleLogout = () => {
    localStorage.removeItem('Token')
    return <Link to="/" />
  }


  render() {
    if (localStorage.getItem('Token')) {
      return (
        <Provider value={this.state}>
          <Fragment>
            <div className="mynav">
              <div className="menu">
                <img src={menuLogo} alt="Menu" width="40px" />
              </div>
              <Link to="/home/product">
                <div className="myTitlePage" >
                  <h3>Food Items</h3>
                </div>
              </Link>

              <div className="search">
                <img src={srcLogo} alt="Search" width="35Spx" />
              </div>
              <div className="cart">
                <img className="cart-logo" src={cartLogo} alt="Cart" width="35px" />
                <p className="cartCount">10</p>
              </div>
            </div>

            <div className="wrapper">
              <div className="sideBar">
                <div className="menuSide">
                  <ul>
                    <li>
                      <img src={foodres} alt="menu" width="40px" />
                    </li>
                    <li>
                      <Link to="/home/history">
                        <img src={clipboard} alt="clipboard" width="40px" />
                      </Link>
                    </li>
                    <li>
                      <img src={addbtn} alt="addbtn" width="40px" onClick={() => this.setState({ modalShow: true })} />
                    </li>
                    <li>
                      <img src={logout} onClick={() => this.handleLogout()} alt="Logout" width="40px" />
                    </li>
                  </ul>
                </div>
              </div>
              {/* call children */}

            </div>
            {/* cart */}
            <div className="container-cart">
              <h1>haloo</h1>
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
