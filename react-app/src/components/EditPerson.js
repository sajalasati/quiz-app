import React, { Component } from "react";
import "./EditPerson.css";

class EditPerson extends Component {
  componentDidMount() {
    var tempo = JSON.parse(localStorage.getItem("session_data"));
    if (!tempo || !tempo.isLoggedin) {
      window.location.replace("/Login");
    } else if (tempo && !tempo.isAdminLoggedin) {
      window.location.replace("/Dashboard");
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Edit a Person</h1>
        </header>
      </div>
    );
  }
}

export default EditPerson;
