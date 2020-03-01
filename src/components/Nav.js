import React from "react";
import "./../styles/Nav.css";

class Nav extends React.Component {
  state = {
    toggle: false
  };

	toggle = () => {
    let toggle = this.state.toggle;
    toggle ? toggle = false : toggle = true
    this.setState({ toggle
  })}

  render() {

    return (
      <>
        <header>
          <div className="logo">Logo</div>
          <nav className={this.state.toggle ? "active" : ""}>
            <ul>
              <li>
                <a href="#" className="active">
                  Home
                </a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Team</a>
              </li>
              <li>
                <a href="#">Portfolio</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </nav>
          <div onClick={this.toggle} className="menu-toggle">
            <i className="fas fa-bars"></i>
          </div>
        </header>
      </>
    );
  }
}

export default Nav;
