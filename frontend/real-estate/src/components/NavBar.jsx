import React from "react"
import image from "./images/logo.png"

export default function NavBar() {
    return (        
        <nav>
            <section className="logo">
                <img src ={image} className="logo" />
            </section>
            <input type="checkbox" id="check"></input>
                <label for="click" className="menu-btn">
                    <i className="fa fa-bars"></i>
                </label>
            <ul className="nav-items">
                <li><a href="#" className="nav--link">Home</a></li>
                <li><a href="" className="nav--link">About</a></li>
                <li><a href="" className="nav--link">Contact</a></li>
                <li><a href="" className="nav--link">Property</a></li>
                <li className="login">
                    <a href="" className="login--link">Login/Sign Up</a>
                </li>
            </ul>
            

        </nav>
    )
}