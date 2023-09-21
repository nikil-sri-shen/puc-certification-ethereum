import "./Navbar.css";
import React from "react";
import { Link } from "react-router-dom";

export class Navbar extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/addcertificate">Add Certificate</Link>
            </li>
            <li>
              <Link to="/viewcertificate">View Certificate</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;
