import React, { Component } from "react";
import "./Login.css";

class LogoutPerson extends Component {
  componentDidMount() {
    var tempo = JSON.parse(localStorage.getItem("session_data"));
    if (!tempo || !tempo.isLoggedin) {
      window.location.replace("/Login");
    }
  }
  render() {
    const session_data = JSON.parse(localStorage.getItem("session_data"));
    if (session_data) {
      session_data.isLoggedin = false;
      session_data.isAdminLoggedin = false;
      session_data.username = "";
      localStorage.setItem("session_data", JSON.stringify(session_data));
      window.location.replace("/Login");
    }
    return null;
  }
}

export default LogoutPerson;
