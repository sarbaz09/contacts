import axios from "axios";
import React, { Component } from "react";
import { backendUrlRegister } from "../BackendURL";
import { Message } from "primereact/message";
import { InputText } from "primereact/inputtext";
import "./custom.css";
class Register extends Component {
  state = {
    name: "",
    formValue: { userName: "", userEmail: "", password: "", secret: "" },
    formErrors: {
      userNameErr: "",
      passwordErr: "",
      secretErr: "",
      userEmailErr: "",
    },
    fieldValidity: {
      userName: false,
      password: false,
      secret: false,
      userEmail: false,
    },
    formValid: false,
    successMessage: "",
    errorMessage: "",
  };
  validateName = (e) => {
    const name = e.target.value;
    var formErrors = this.state.formErrors;
    var fieldValidity = this.state.fieldValidity;
    var formValue = this.state.formValue;
    this.setState({ formValue: { ...formValue, userName: e.target.value } });
    if (name === "") {
      formErrors.userNameErr = "Field Required";
      fieldValidity.userName = false;
    } else if (!name.match(/^[A-Za-z]+([\s][A-Za-z]+)*$/)) {
      formErrors.userNameErr =
        "Name should contain only English alphabets and Spaces.";
      fieldValidity.userName = false;
    } else {
      formErrors.userNameErr = "";
      fieldValidity.userName = true;
    }
    this.setState({ fieldValidity: fieldValidity });
    this.setState({
      formValid:
        fieldValidity.userName &&
        fieldValidity.password &&
        fieldValidity.secret &&
        fieldValidity.userEmail,
    });
  };
  validatePassword = (e) => {
    var formValue = this.state.formValue;
    const password = e.target.value;
    this.setState({
      formValue: { ...formValue, password: e.target.value },
    });
    var formErrors = this.state.formErrors;
    var fieldValidity = this.state.fieldValidity;
    if (password === "") {
      formErrors.passwordErr = "Field Required";
      fieldValidity.password = false;
    } else if (password.match(/^.*[ ].*$/)) {
      formErrors.passwordErr = "Password should not contain spaces";
      fieldValidity.password = false;
    } else {
      formErrors.passwordErr = "";
      fieldValidity.password = true;
    }
    this.setState({ formErrors: formErrors });
    this.setState({
      formValid:
        fieldValidity.userName &&
        fieldValidity.password &&
        fieldValidity.secret &&
        fieldValidity.userEmail,
    });
  };
  validateSecret = (e) => {
    var formValue = this.state.formValue;
    const secret = e.target.value;
    this.setState({
      formValue: { ...formValue, secret: e.target.value },
    });
    var formErrors = this.state.formErrors;
    var fieldValidity = this.state.fieldValidity;
    if (secret === "") {
      formErrors.secretErr = "Field Required";
      fieldValidity.secret = false;
    } else {
      formErrors.secretErr = "";
      fieldValidity.secret = true;
    }
    this.setState({ formErrors: formErrors });
    this.setState({
      formValid:
        fieldValidity.userName &&
        fieldValidity.password &&
        fieldValidity.secret &&
        fieldValidity.userEmail,
    });
  };
  validateEmail = (e) => {
    var formValue = this.state.formValue;
    const email = e.target.value;
    this.setState({
      formValue: { ...formValue, userEmail: e.target.value },
    });
    var formErrors = this.state.formErrors;
    var fieldValidity = this.state.fieldValidity;
    if (email === "") {
      formErrors.userEmailErr = "Field Required";
      fieldValidity.userEmail = false;
    } else if (!email.match(/^[A-z0-9]{1,}@[A-z0-9]{1,}\.[A-z]{1,}$/)) {
      formErrors.userEmailErr = "Please enter a valid Email Id.";
      fieldValidity.userEmail = false;
    } else {
      formErrors.userEmailErr = "";
      fieldValidity.userEmail = true;
    }
    this.setState({ formErrors: formErrors });
    this.setState({
      formValid:
        fieldValidity.userName &&
        fieldValidity.password &&
        fieldValidity.secret &&
        fieldValidity.userEmail,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.submitRegistration();
  };
  submitRegistration = () => {
    this.setState({ errorMessage: "", successMessage: "" });
    console.log(this.state.formValue);
    axios
      .post(backendUrlRegister, this.state.formValue)
      .then((response) => {
        this.setState({ successMessage: response.data });
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          this.setState({ errorMessage: error.response.data.message });
        } else {
          this.setState({
            errorMessage: "Please run the backend",
            successMessage: "",
          });
        }
      });
  };
  handleClose = () => {
    this.setState({ modalShow: false });
  };

  render() {
    return (
      <div>
        <div className="row my-5">
          <div className="bgform col-sm-8 offset-sm-2 col-md-4 offset-md-4 border border-secondary border-rounded pt-3">
            <section className="col"></section>
            <section className="col p-4">
              <form className="form form-horizontal">
                <h1 className="display-5">Sign Up</h1>
                {/* <div className="form-group mt-4">
                  <label>Name:</label>
                  <input
                    className="form-control"
                    onChange={this.validateName}
                    value={this.state.formValue.userName}
                  />
                </div>
                <span className="text-danger">
                  {this.state.formErrors.userNameErr}
                </span> */}
                <div className="form-group mt-4">
                  <span className="p-float-label">
                    <InputText
                      id="name"
                      required
                      type="text"
                      name="name"
                      onChange={this.validateName}
                      className="form-control"
                      value={this.state.formValue.userName}
                    />
                    {
                      <label htmlFor="name" className="font-weight-bold">
                        Name
                      </label>
                    }
                  </span>
                  {this.state.formErrors.userNameErr ? (
                    <Message
                      severity="error"
                      text={this.state.formErrors.userNameErr}
                    />
                  ) : null}
                </div>
                <br />
                <div className="form-group">
                  <span className="p-float-label">
                    <InputText
                      id="email"
                      required
                      type="email"
                      name="email"
                      onChange={this.validateEmail}
                      className="form-control"
                      value={this.state.formValue.userEmail}
                    />
                    {
                      <label htmlFor="email" className="font-weight-bold">
                        Email
                      </label>
                    }
                  </span>
                  {this.state.formErrors.userEmailErr ? (
                    <Message
                      severity="error"
                      text={this.state.formErrors.userEmailErr}
                    />
                  ) : null}
                </div>
                <br />
                {/* <div className="form-group">
                  <label>Email:</label>
                  <input
                    className="form-control"
                    onChange={this.validateEmail}
                    value={this.state.formValue.userEmail}
                  />
                </div>
                <span className="text-danger">
                  {this.state.formErrors.userEmailErr}
                </span> */}
                <div className="form-group">
                  <span className="p-float-label">
                    <InputText
                      id="password"
                      required
                      type="password"
                      name="password"
                      onChange={this.validatePassword}
                      className="form-control"
                      value={this.state.formValue.password}
                    />
                    {
                      <label htmlFor="password" className="font-weight-bold">
                        Password
                      </label>
                    }
                  </span>
                  {this.state.formErrors.passwordErr ? (
                    <Message
                      severity="error"
                      text={this.state.formErrors.passwordErr}
                    />
                  ) : null}
                </div>
                <br />
                {/* <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={this.validatePassword}
                    value={this.state.formValue.password}
                  />
                </div>
                <span className="text-danger">
                  {this.state.formErrors.passwordErr}
                </span> */}
                <div className="form-group">
                  <span className="p-float-label">
                    <InputText
                      id="secret"
                      required
                      type="text"
                      name="secret"
                      onChange={this.validateSecret}
                      className="form-control"
                      value={this.state.formValue.secret}
                    />
                    {
                      <label htmlFor="secret" className="font-weight-bold">
                        Secret
                      </label>
                    }
                  </span>
                  {this.state.formErrors.secretErr ? (
                    <Message
                      severity="error"
                      text={this.state.formErrors.secretErr}
                    />
                  ) : null}
                </div>
                <br />
                {/* <div className="form-group">
                  <label>Secret:</label>
                  <input
                    className="form-control"
                    onChange={this.validateSecret}
                    value={this.state.formValue.secret}
                  />
                </div>
                <span className="text-danger">
                  {this.state.formErrors.secretErr}
                </span>
                <br /> */}
                <button
                  type="button"
                  onClick={this.handleSubmit}
                  className="btn btn-primary"
                  disabled={!this.state.formValid}
                >
                  Sign Up
                </button>
                <br />
                <span className="text-success">
                  {this.state.successMessage}
                </span>
              </form>
            </section>
            <section className="col"></section>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
