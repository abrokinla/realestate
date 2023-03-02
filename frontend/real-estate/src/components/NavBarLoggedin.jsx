import React, { Component } from "react";
import image from "./logo.png";

class NavBarLoggedin extends Component {
  // logout
  handleLogout() {
    localStorage.removeItem(idToken);
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

            <li className="login">
              <a>Dashboard</a>              
            </li>

            <li className="welcome">
              <a>
                Welcome {this.props.first_name} <i className="fa fa-caret-down"></i>
              </a>
              <ul className="dropdown">
                <section id="welcome-container">
                  <li>
                    View Profile
                    {/* <a onClick={() => this.navTo('/profile')}>
                      View Profile
                    </a> */}
                  </li>
                  <li className="divider"></li>
                  <li>
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
