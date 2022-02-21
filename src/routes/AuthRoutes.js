import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import TopBar from "../components/layouts/TopBar";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";
import Forgot from "../components/auth/Forgot";

export default class AuthRoutes extends Component {
  menuBtn = () => {
    const body = document.body;
    body.classList.toggle("open-menu-panel");
  };
  render() {
    return (
      <div>
        <TopBar />
        <div className="center-body-wrap">
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/auth/login" component={Login}></Route>
          <Route exact path="/auth/signup" component={SignUp}></Route>
          <Route exact path="/auth/reset-password" component={Forgot}></Route>
          <Redirect from="/auth" exact={true} to="/" />
          <Redirect from="/cart" exact={true} to="/" /> 
        </Switch>
        </div>
      </div>
    );
  }
}
