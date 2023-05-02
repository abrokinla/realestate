import React, { Component } from "react";
import image from "./logo.png";
import Cookies from "js-cookie";
import { checkToken, divertDashboard } from "../components/forms/LoginForm";

class NavBarLoggedin extends Component {
  //dashboard
  handleDashboard = async () => {
    const isAuthorized = await checkToken();
    if (isAuthorized) {
      await divertDashboard();
    } else {
      // handle the case where the user is not authorized, maybe redirect to login page
      window.location.href = window.location.origin + "/login";
    }
  };
  // logout
  handleLogout() {
    const idToken = Cookies.get('idToken');
    if (idToken) {
      Cookies.remove('idToken');
    }
    window.location.href = window.location.origin + '/login';
  }
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

            <li 
              onClick={this.handleDashboard} 
              className="login"
            >
              <a className={this.state.clicked ? "active" : ""}>Dashboard</a>              
            </li>

            <li className="welcome">
              <a>
                Welcome {this.props.first_name} <i className="fa fa-caret-down"></i>
              </a>
              <ul className="dropdown">
                <section id="welcome-container">
                  <li className="login">
                    <a onClick={() => this.navTo('/profile')}>
                      View Profile
                    </a>
                  </li>
                  <li className="divider"></li>
                  <li className="login">
                    <a onClick={this.handleLogout}>
                      Logout
                    </a>
                  </li>
                </section>
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

export default NavBarLoggedin;
