// Core
import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Routes from "../routes/Routes";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    return (
      <React.Suspense>
        {/* Override `basename` (e.g: `homepage` in `package.json`) */}
        <BrowserRouter>
          <Routes />{" "}
        </BrowserRouter>
      </React.Suspense>
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
