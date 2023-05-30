import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  let location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <img className="mx-2" src="https://rcts.iiit.ac.in/wp-content/themes/RR_Center/assets/img/iiit-logo.png" alt="Bootstrap" width="90" height="50" />
        <img className="mx-2" src="https://rcts.iiit.ac.in/wp-content/themes/RR_Center/assets/img/site-logo.png" alt="Bootstrap" width="90" height="50" />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-3 me-auto mb-2 mb-lg-0">
            <li className="nav-item mx-2">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/Graph">
              Visualization
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
