import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { User } from "./Models/User";
import axios from "axios";
import { Message } from "primereact/message";
import { InputText } from "primereact/inputtext";
import { backendUrlLogin } from "../BackendURL";
import { conditionalExpression } from "@babel/types";
import "./custom.css";
class Login extends Component {
  state = {
    successMessage: "",
    logged_userId: sessionStorage.getItem("userId"),
    register: false,
    errorMessage: null,
    loginForm: {
      email: "",
      password: "",
    },
    email: "",
    emailErrorMessage: "",
    password: "",
    passwordErrorMessage: "",
    validPassword: false,
    validEmail: false,
  };
  login = (event) => {
    event.preventDefault();
    var emailId = document.getElementById("emailId").value;
    var password = document.getElementById("password").value;
    var user = new User();
    user.userEmail = emailId;
    user.password = password;
    axios
      .post(backendUrlLogin, user)
      .then((response) => {
        this.setState({
          register: false,
          successMessage: "User logged in",
        });
        sessionStorage.setItem("userId", response.data.userId);
        sessionStorage.setItem("userName", response.data.userName);
        window.location.reload();
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ errorMessage: error.response.data.error });
        } else {
          this.setState({
            errorMessage: "Cannot connect to server at this time",
          });
        }
      });
  };
  cancel = () => {
    this.setState({
      email: "",
      password: "",
    });
  };
  register = () => {
    this.setState({
      register: true,
    });
    console.log(this.state.register);
  };
  validate = (event) => {
    var fieldName = event.target.name;
    var value = event.target.value;
    var errorMessage = "";
    switch (fieldName) {
      case "email":
        if (value === "") {
          this.setState({
            emailErrorMessage: "Field Required",
            validEmail: false,
          });
        } else if (!value.match(/^[A-z0-9]{1,}@[A-z0-9]{1,}\.[A-z]{1,}$/)) {
          this.setState({
            emailErrorMessage: "Please enter a valid Email Id.",
            validEmail: false,
          });
        } else {
          this.setState({
            emailErrorMessage: "",
            validEmail: true,
          });
        }
        this.setState({
          email: value,
        });
        break;
      case "password":
        if (value === "") {
          this.setState({
            passwordErrorMessage: "Field Required",
            validPassword: true,
          });
        } else if (value.match(/^.*[ ].*$/)) {
          this.setState({
            passwordErrorMessage: "Password should not contain spaces",
            validPassword: true,
          });
        } else {
          this.setState({ passwordErrorMessage: "", validPassword: true });
        }
        this.setState({
          password: value,
        });
        break;
    }
  };
  render() {
    if (this.state.register === true) return <Navigate to={"/register"} />;
    else if (this.state.logged_userId) return <Navigate to={"/"} />;
    return (
      <div>
        <div className="row my-5">
          <div className="bgform col-sm-8 offset-sm-2 col-md-4 offset-md-4 border border-secondary border-rounded pt-3">
            <section className="col"></section>
            <section className="col p-4">
              <form className="form form-horizontal">
                <h1 className="display-5">Login</h1>
                <div className="form-group mt-4">
                  <span className="p-float-label">
                    <InputText
                      id="emailId"
                      required
                      type="text"
                      name="email"
                      onChange={this.validate}
                      className="form-control"
                      value={this.state.email}
                    />
                    {
                      <label htmlFor="email" className="font-weight-bold">
                        Email Id
                      </label>
                    }
                  </span>
                  {this.state.emailErrorMessage ? (
                    <Message
                      severity="error"
                      text={this.state.emailErrorMessage}
                    />
                  ) : null}
                </div>
                <br />
                <div className="form-group">
                  <span className="p-float-label">
                    <InputText
                      id="password"
                      required
                      type="password"
                      name="password"
                      onChange={this.validate}
                      className="form-control"
                      value={this.state.password}
                    />
                    {
                      <label htmlFor="password" className="font-weight-bold">
                        Password
                      </label>
                    }
                  </span>
                  {this.state.passwordErrorMessage ? (
                    <Message
                      severity="error"
                      text={this.state.passwordErrorMessage}
                    />
                  ) : null}
                </div>
                <br />
                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <button
                        type="submit"
                        className="btn btn-primary form-control"
                        onClick={this.login}
                      >
                        Login
                      </button>
                    </div>
                    <div className="col">
                      <button
                        type="submit"
                        className="btn btn-secondary form-control"
                        onClick={this.cancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="my-4 col btn btn-outline-success form-control"
                    onClick={this.register}
                  >
                    Register
                  </button>
                  {this.state.errorMessage ? (
                    <Message
                      severity="error"
                      text="Invalid email or password"
                    />
                  ) : null}
                </div>
              </form>
            </section>
            <section className="col"></section>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
