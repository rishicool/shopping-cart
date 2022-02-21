import React from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import logo from "../../assets/images/logo-light.png";
import Products from "../../pages/Products";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import Forgot from "../auth/Forgot";

const Header = () => {
  const body = document.body;
  const menuBtn = () => {
    body.classList.toggle("open-menu-panel");
  };
  return (
    <>
      <Router>
        <header>
          <div className="container">
            <div className="navigation">
              <div className="logo">
                <a href="# ">
                  Shopping Cart
                </a>
              </div>
              <nav>
                <ul>
                  <li>
                    <Link to="/auth/signup">Sign Up</Link>
                  </li>
                  <li>
                    <Link to="/auth/login">Sign in</Link>
                  </li>
                </ul>

                <div className="menu-btn" onClick={menuBtn}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </nav>
            </div>
          </div>
        </header>
        <Switch>
          <Route exact path="/" component={Products}></Route>
          <Route exact path="/auth/login" component={Login}></Route>
          <Route exact path="/auth/signup" component={SignUp}></Route>
          <Route exact path="/auth/reset-password" component={Forgot}></Route>
          <Redirect from="/auth" exact={true} to="/" />
          <Redirect exact from="/" to="/" />
        </Switch>
      </Router>
    </>
  );
};

export default Header;
