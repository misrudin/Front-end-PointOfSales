import React, { Component, Fragment } from 'react'
import './History.css'
import image from '../../img/6157355-cofe.jpg'

class History extends Component {
    render() {
        return (
            <Fragment>
                <div className="wew">
                    <div className="kotak">
                        <img className="gbr" src={image} alt="gambar" />
                        <p className="titleimg">Kopi</p>
                        <p className="des">Enak diminum cuy</p>
                    </div>
                    <div className="kotak">
                        <img className="gbr" src={image} alt="gambar" />
                        <p className="titleimg">Kopi</p>
                        <p className="des">Enak diminum cuy</p>
                    </div>
                    <div className="kotak">
                        <img className="gbr" src={image} alt="gambar" />
                        <p className="titleimg">Kopi</p>
                        <p className="des">Enak diminum cuy</p>
                    </div>
                    <div className="kotak">
                        <img className="gbr" src={image} alt="gambar" />
                        <p className="titleimg">Kopi</p>
                        <p className="des">Enak diminum cuy</p>
                    </div>
                    <div className="kotak">
                        <img className="gbr" src={image} alt="gambar" />
                        <p className="titleimg">Kopi</p>
                        <p className="des">Enak diminum cuy</p>
                    </div>
                    <div className="kotak">
                        <img className="gbr" src={image} alt="gambar" />
                        <p className="titleimg">Kopi</p>
                        <p className="des">Enak diminum cuy</p>
                    </div>
                    <div className="kotak">
                        <img className="gbr" src={image} alt="gambar" />
                        <p className="titleimg">Kopi</p>
                        <p className="des">Enak diminum cuy</p>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default History