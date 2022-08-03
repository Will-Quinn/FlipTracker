import React from "react";
import logo from "./assets/logo.png";
import pillarLeft from "./assets/pillarLeft.png";
import pillarRight from "./assets/pillarRight.png";
// We import bootstrap to make our application look better.
import './assets/styles.css';
import "bootstrap/dist/css/bootstrap.css";
import './assets/styles.css';
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <img style={{"width" : 8 + '%', "left" : "0"}} src={pillarLeft}></img>
        <div class="flex-container" style={{"margin" : "auto"}}>
          <div class="flex-items">
        <NavLink to="/" >
        <img style={{"width" : 17 + '%', "margin-left" : "41.5%"}} src={logo}></img>
        </NavLink>
          </div>
          <div class="flex-items">
          <a href="/create" style={{"margin" : "auto"}}>
              <button type="button" class="btn btn-light" >Enter Flip</button>
          </a>             
          </div>
        </div>          
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <img style={{"width" : 8 + '%', "right" : "0"}} src={pillarRight}></img>
      </nav>
    </div>
  );
}
