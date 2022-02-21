/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React, { Component } from "react";
import { Redirect, Switch, Route } from "react-router-dom";

import { connect } from "react-redux";

import HomeRoutes from "./HomeRoutes";
import AuthRoutes from "./AuthRoutes";

class Routes extends Component {
  render() {
    const {
      getUser: { isLoggedIn },
    } = this.props;
    let logincheck = false;
    if(typeof isLoggedIn == "undefined"){
      // logincheck = false;
      return (
        <></>
      );
    }
    else{
      logincheck = isLoggedIn;
    }

    return (
      <Switch>
        <Route>
          {!logincheck && (
            <>
              <AuthRoutes />
            </>
          )}
          {logincheck && (
            <>
              <HomeRoutes />
            </>
          )}
        </Route>
      </Switch>
    );
  }
}

const mapStateToProps = (state) => ({
  getUser: state.userReducer.getUser,
  authData: state.authReducer.authData,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
