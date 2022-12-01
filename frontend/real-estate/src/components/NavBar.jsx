import React from "react"
import { Component } from "react"
import image from "./images/logo.png"

class NavBar extends Component {
    state = { clicked : false };
    handleClick = () => {
        this.setState({
            clicked : !this.state.clicked
        })
    }
    render() {
    return (        
        <nav>
            <section className="logo">
                <img src ={image} className="logo" />
            </section>
            <section>
                <ul id="navitems" className=
                {this.state.clicked ? "#navitems active" : "#navitems"}>
                    <li><a className="active" href="#" >Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Property</a></li>
                    <li className="login">
                    <a href="">Login/Sign Up</a>
                    </li>
                </ul>
            </section>
            <div id="mobile" onClick={this.handleClick}>
                <i id="bar"
                className=
                {
                    this.state.clicked ? "fas fa-times" : "fas fa-bars"
                }>                    
                </i>
            </div>
            

        </nav>
    )
}
}

export default NavBar;