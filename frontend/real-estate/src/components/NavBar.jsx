import React from "react"
import image from "./images/logo.png"

export default function NavBar() {
    return (
        // <h1>hi</h1>
        <nav>
            <img src ={image} className="logo" />
            <ul className="nav-items">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
                <li>Property</li>
                <li className="login"><strong>Login/Sign Up</strong></li>
            </ul>
        </nav>
    )
}