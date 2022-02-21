
import React, { Component } from "react";
import { connect } from 'react-redux';

import Footer from './AuthFooter';

import Header from './AuthHeader';
import DownloadApp from '../../components/elements/DownloadApp';

class AuthLayout extends Component {

  render() {
  //  const { authData: { isLoggedIn, token } } = this.props;
    return (
      <>      
      <Header />
      {this.props.children}
      {this.props.download && <DownloadApp />}
      <Footer />
      </>
    );
  }
}


const mapStateToProps = (state) => ({
  authData: state.authReducer.authData,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLayout);