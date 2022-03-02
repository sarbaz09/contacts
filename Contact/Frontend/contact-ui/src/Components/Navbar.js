import React, { Component } from "react";
import { Dialog } from "primereact/dialog";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Register from "./Register";
import Contacts from "./Contacts";
import Home from "./Home";
import Login from "./Login";
import "./navbar.css";
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_userId: sessionStorage.getItem("userId"),
      logged_userName: sessionStorage.getItem("userName"),
      dialogue_visible: false,
      logged_out: false,
    };
  }
  onClick = () => {
    this.setState({ dialogue_visible: true });
  };
  onHide = () => {
    this.setState({ dialogue_visible: false });
  };
  logout = () => {
    this.setState({ dialogue_visible: false });
    sessionStorage.clear();
    this.setState({ logged_out: true });
    window.location.reload();
  };
  confirm_logout = () => {
    this.setState({ dialogue_visible: true });
  };
  render() {
    const dialogFooter = (
      <div>
        <button className="btn btn-light" onClick={this.onHide}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={this.logout}>
          Logout
        </button>
      </div>
    );
    return (
      <div>
        <Router>
          <div className="App">
            <nav className="navbar sticky-top navbar-expand-md bg-primary navbar-dark">
              <div className="navbar-header">
                <Link className="navbar-brand  px-4" to="/">
                  Contacts App
                </Link>
              </div>
              <Dialog
                header="Confirm Logout"
                visible={this.state.dialogue_visible}
                width="300px"
                footer={dialogFooter}
                onHide={this.onHide}
              >
                Are you sure you want to logout?
              </Dialog>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  {this.state.logged_userId ? (
                    <li className="nav-item">
                      <Link className="nav-link text-light" to="">
                        Welcome {this.state.logged_userName}
                      </Link>
                    </li>
                  ) : null}
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  {this.state.logged_userId ? (
                    <li className="nav-item">
                      <Link className="nav-link" to="/contacts">
                        Contacts
                      </Link>
                    </li>
                  ) : null}
                  {!this.state.logged_userId ? (
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">
                        Register
                      </Link>
                    </li>
                  ) : null}
                  {!this.state.logged_userId ? (
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        Login
                      </Link>
                    </li>
                  ) : null}
                  {this.state.logged_userId ? (
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        onClick={this.confirm_logout}
                        to=""
                      >
                        Logout
                      </Link>
                    </li>
                  ) : null}
                </ul>
              </div>
            </nav>
          </div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/contacts" element={<Contacts />} />
          </Routes>
        </Router>
      </div>
    );
  }
  // render() {
  //   return (
  //     <div>
  //       <Router>
  //         <Navbar bg="primary" variant="dark">
  //           <Container>
  //             <Navbar.Brand href="#home">Contacts App</Navbar.Brand>
  //             <Nav className="me-auto">
  //               <Nav.Link>Home</Nav.Link>
  //               <Nav.Link>
  //                 <Link className="nav-link" to="/contacts">
  //                   Contacts
  //                 </Link>
  //               </Nav.Link>
  //               <Nav.Link>Sign Up</Nav.Link>
  //             </Nav>
  //           </Container>
  //         </Navbar>
  //       </Router>
  //     </div>
  //   );
  // }
}
export default NavBar;
