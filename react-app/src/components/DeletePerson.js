import React, { Component } from "react";
import "./DeletePerson.css";

class DeletePerson extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    var valueToSubmit = document.querySelector('input[name="optradio"]:checked')
      .value;
    var url = "http://localhost:8080/people/" + valueToSubmit;
    fetch(url, {
      method: "DELETE"
    });
  }
  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    var tempo = JSON.parse(localStorage.getItem("session_data"));
    if (!tempo || !tempo.isLoggedin) {
      window.location.replace("/Login");
    } else if (tempo && !tempo.isAdminLoggedin) {
      window.location.replace("/Dashboard");
    }
    const request = new Request("http://127.0.0.1:8080/people/");
    fetch(request)
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Delete a Person</h1>
        </header>
        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(function(item, key) {
              return (
                <tr key={key}>
                  <td>{item.id}</td>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{item.city}</td>
                  <td>
                    <input type="radio" name="optradio" value={item.id} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

export default DeletePerson;
