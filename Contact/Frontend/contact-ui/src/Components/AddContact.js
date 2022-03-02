import axios from "axios";
import React, { Component } from "react";
import { backendUrlContacts } from "../BackendURL";
import { Message } from "primereact/message";
import { InputText } from "primereact/inputtext";
import "./custom.css";
class AddContact extends Component {
  state = {
    name: "",
    formValue: {
      contactName: "",
      contactEmail: "",
      contactNumber: "",
      userId: sessionStorage.getItem("userId"),
    },
    formErrors: {
      contactNameErr: "",
      contactNumberErr: "",
      contactEmailErr: "",
    },
    fieldValidity: {
      contactName: false,
      contactEmail: false,
      contactNumber: false,
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
    this.setState({ formValue: { ...formValue, contactName: e.target.value } });
    if (name === "") {
      formErrors.contactNameErr = "Field Required";
      fieldValidity.contactName = false;
    } else if (!name.match(/^[A-Za-z]+([\s][A-Za-z]+)*$/)) {
      formErrors.contactNameErr =
        "Name should contain only English alphabets and Spaces.";
      fieldValidity.contactName = false;
    } else {
      formErrors.contactNameErr = "";
      fieldValidity.contactName = true;
    }
    this.setState({ fieldValidity: fieldValidity });
    this.setState({
      formValid:
        fieldValidity.contactName &&
        fieldValidity.contactEmail &&
        fieldValidity.contactNumber,
    });
  };
  validateNumber = (e) => {
    var formValue = this.state.formValue;
    const contactNumber = e.target.value;
    this.setState({
      formValue: { ...formValue, contactNumber: e.target.value },
    });
    var formErrors = this.state.formErrors;
    var fieldValidity = this.state.fieldValidity;
    if (contactNumber === "") {
      formErrors.contactNumberErr = "Field Required";
      fieldValidity.password = false;
    } else if (
      !contactNumber.match(
        /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
      )
    ) {
      formErrors.contactNumberErr = "Invalid phone number.";
      fieldValidity.contactNumber = false;
    } else {
      formErrors.contactNumberErr = "";
      fieldValidity.contactNumber = true;
    }
    this.setState({ formErrors: formErrors });
    this.setState({
      formValid:
        fieldValidity.contactName &&
        fieldValidity.contactEmail &&
        fieldValidity.contactNumber,
    });
  };

  validateEmail = (e) => {
    var formValue = this.state.formValue;
    const email = e.target.value;
    this.setState({
      formValue: { ...formValue, contactEmail: e.target.value },
    });
    var formErrors = this.state.formErrors;
    var fieldValidity = this.state.fieldValidity;
    if (email === "") {
      formErrors.contactEmailErr = "Field Required";
      fieldValidity.contactEmail = false;
    } else if (!email.match(/^[A-z0-9]{1,}@[A-z0-9]{1,}\.[A-z]{1,}$/)) {
      formErrors.contactEmailErr = "Please enter a valid Email Id.";
      fieldValidity.contactEmail = false;
    } else {
      formErrors.contactEmailErr = "";
      fieldValidity.contactEmail = true;
    }
    this.setState({ formErrors: formErrors });
    this.setState({
      formValid:
        fieldValidity.contactName &&
        fieldValidity.contactEmail &&
        fieldValidity.contactNumber,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.submitRegistration();
    window.location.reload();
  };
  submitRegistration = () => {
    this.setState({ errorMessage: "", successMessage: "" });
    console.log(this.state.formValue);
    axios
      .post(backendUrlContacts, this.state.formValue)
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
        {this.state.formValue.userId ? (
          <div className="row my-5">
            {/* <div className="col-sm-8 offset-sm-2 col-md-4 offset-md-4 border border-secondary border-rounded pt-3"> */}
            <div className="bgform col-sm-8 offset-sm-2 border border-secondary border-rounded pt-3 ">
              <section className="col"></section>
              <section className="col p-4">
                <form className="form form-horizontal">
                  <h1 className="display-5">Add Contacts</h1>
                  <div className="form-group mt-4">
                    <span className="p-float-label">
                      <InputText
                        id="name"
                        required
                        type="text"
                        name="name"
                        onChange={this.validateName}
                        className="form-control"
                        value={this.state.formValue.contactName}
                      />
                      {
                        <label htmlFor="name" className="font-weight-bold">
                          Name
                        </label>
                      }
                    </span>
                    {this.state.formErrors.contactNameErr ? (
                      <Message
                        severity="error"
                        text={this.state.formErrors.contactNameErr}
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
                        value={this.state.formValue.contactEmail}
                      />
                      {
                        <label htmlFor="email" className="font-weight-bold">
                          Email
                        </label>
                      }
                    </span>
                    {this.state.formErrors.contactEmailErr ? (
                      <Message
                        severity="error"
                        text={this.state.formErrors.contactEmailErr}
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
                        id="number"
                        required
                        type="text"
                        name="number"
                        onChange={this.validateNumber}
                        className="form-control"
                        value={this.state.formValue.contactNumber}
                      />
                      {
                        <label htmlFor="number" className="font-weight-bold">
                          Phone No
                        </label>
                      }
                    </span>
                    {this.state.formErrors.contactNumberErr ? (
                      <Message
                        severity="error"
                        text={this.state.formErrors.contactNumberErr}
                      />
                    ) : null}
                  </div>
                  <br />

                  <button
                    type="button"
                    onClick={this.handleSubmit}
                    className="btn btn-primary"
                    disabled={!this.state.formValid}
                  >
                    Add
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
        ) : null}
      </div>
    );
  }
}
export default AddContact;
