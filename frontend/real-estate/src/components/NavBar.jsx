import React, { Component } from "react";
import image from "./logo.png";

class NavBar extends Component {
  navTo(uri) {
    window.location.href = window.location.origin + uri;
  }

  state = { clicked: false };
  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked,
    });
  };

  render() {
    return (
      <nav>
        <section className="logo">
          <img src={image} className="logo" />
        </section>
        <section>
          <ul
            id="navitems"
            className={this.state.clicked ? "navitems active" : "navitems"}
          >
            <li
              onClick={() => {
                this.navTo("");
              }}
            >
              <a className={this.state.clicked ? "active" : ""}>Home</a>
            </li>
            <li
              onClick={() => {
                this.navTo("/about");
              }}
            >
              <a className={this.state.clicked ? "active" : ""}>About</a>
            </li>
            <li
              onClick={() => {
                this.navTo("/contact");
              }}
            >
              <a className={this.state.clicked ? "active" : ""}>Contact</a>
            </li>
            <li
              onClick={() => {
                this.navTo("/properties");
              }}
            >
              <a className={this.state.clicked ? "active" : ""}>Property</a>
            </li>

            <li className="login" style={{ position: "relative" }}>
              <a>Login/Sign Up</a>
              <ul className="login-submenu" style={{ zIndex: 1 }}>
                <li
                  onClick={() => {
                    this.navTo("/login");
                  }}
                >
                  <a>Login</a>
                </li>
                <li className="login">
                  <a>Sign Up</a>
                  <ul className="login-submenu" style={{ left: "50%", top: 0 }}>
                    <li
                      onClick={() => {
                        this.navTo("/user-form");
                      }}
                    >
                      <a>User</a>
                    </li>
                    <li
                      onClick={() => {
                        this.navTo("/agent-form");
                      }}
                    >
                      <a>Agent</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </section>
        <div id="mobile" onClick={this.handleClick}>
          <i
            id="bar"
            className={
              this.state.clicked ? "fas fa-times" : "fas fa-bars"
            }
          ></i>
        </div>
      </nav>
    );
  }
}

export default NavBar;
