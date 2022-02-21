import React, { Component } from "react";
import TopBar from "../../components/layouts/TopBar";
import Container from 'react-bootstrap/Container'
import {
  Link
} from "react-router-dom";

export default class ErrorsPage extends Component {
  render() {
    return (

      <Container>
        <TopBar />
        <div className="center-body-wrap">
          <div className="page-404" style={{marginTop: 40}}>
            <div className="container">
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <div className="d-flex text-center flex-column flex-root">
                    <h1>404</h1>
                    <p className="font-size-h3 font-weight-light">
                      The page you are looking for, doesn't exists in our universe
                    </p>
                    <Link to="/" className="go-back-home">
                      GO BACK HOME
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

    );
  }
}
