import React, { Component } from "react";
import axios from "axios";
import { backendUrlContacts } from "../BackendURL.js";
import AddContact from "./AddContact.js";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      logged_userId: sessionStorage.getItem("userId"),
    };
    this.fetchContacts = this.fetchContacts.bind(this);
  }
  componentDidMount() {
    this.fetchContacts();
  }
  fetchContacts() {
    axios
      .get(backendUrlContacts + `/${this.state.logged_userId}`)
      .then((response) => {
        this.setState({
          result: response.data,
          error: "",
        }).catch((error) => {
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
      });
  }
  render() {
    const { result } = this.state;
    return (
      <div className="row">
        <div className="col">
          <AddContact />
        </div>
        <div className="col m-4">
          <section className="col"></section>
          <section className="col p-4">
            <div>{result ? <Table list={result} /> : null}</div>
          </section>
        </div>
      </div>
    );
  }
}
const Table = ({ list }) => (
  <div>
    <div className="card">
      <DataTable value={list} responsiveLayout="scroll">
        <Column field="contactName" header="Name"></Column>
        <Column field="contactNumber" header="Ph No"></Column>
        <Column field="contactEmail" header="Email"></Column>
      </DataTable>
    </div>
  </div>
);

export default Contacts;
