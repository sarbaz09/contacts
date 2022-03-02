import React, { Component } from "react";
import "./custom.css";
import { Card } from "primereact/card";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { Button } from "primereact/button";
import { Navigate } from "react-router-dom";
class Home extends Component {
  state = {
    login: false,
    contacts: false,
    userId: sessionStorage.getItem("userId"),
  };
  login = () => {
    this.setState({
      login: true,
    });
    console.log(this.state.login);
  };
  contacts = () => {
    this.setState({
      contacts: true,
    });
    console.log(this.state.contacts);
  };
  render() {
    if (this.state.login === true) return <Navigate to={"/login"} />;
    if (this.state.contacts === true) return <Navigate to={"/contacts"} />;
    return (
      <div>
        <div className="home">
          <Splitter className="bg-light" style={{ height: "auto" }}>
            <SplitterPanel size={60}>
              <Card className="col-sm-8 offset-sm-2 col-md-10 offset-md-1 my-4 centertext">
                <div className="jumbotron quote">
                  <h1 className="display-4">
                    <blockquote>
                      "Skill is fine, and genius is splendid, but the right
                      contacts are more valuable that either"
                    </blockquote>
                  </h1>
                  <p className="lead">
                    Join us to keep thousands of contacts handy.
                  </p>
                  <hr className="my-4" />
                </div>
              </Card>
            </SplitterPanel>
            <SplitterPanel size={40} className="center bg-light">
              {!this.state.userId ? (
                <div>
                  <p className="lead centertext">
                    Sign In to to view and add contacts
                    <br />
                    <br />
                    <Button
                      label="Login"
                      className="p-button-raised p-button"
                      onClick={this.login}
                    />
                    <br />
                    <br />
                    <hr />
                  </p>
                  <p className="text-muted centertext">
                    Don't have an account&nbsp;
                    <span className="link">
                      <a href="register">Sign Up</a>
                    </span>
                  </p>
                </div>
              ) : null}
              {this.state.userId ? (
                <div>
                  <p className="lead centertext">
                    Explore your contacts
                    <br />
                    <br />
                    <Button
                      label="Contacts"
                      className="p-button-raised p-button"
                      onClick={this.contacts}
                    />
                  </p>
                </div>
              ) : null}
            </SplitterPanel>
          </Splitter>
        </div>
      </div>
    );
  }
}
export default Home;
