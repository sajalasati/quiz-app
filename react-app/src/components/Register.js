import React, { Component } from "react";
import "./Register.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        FirstName: "",
        LastName: "",
        City: "",
        Email: "",
        Username: "",
        Password: ""
      },
      submitted: false,
      username_exist: false,
      email_exists: false
    };
    this.handleFChange = this.handleFChange.bind(this);
    this.handleLChange = this.handleLChange.bind(this);
    this.handleCChange = this.handleCChange.bind(this);
    this.handleUChange = this.handleUChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleEChange = this.handleEChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    var tempo = JSON.parse(localStorage.getItem("session_data"));
    if (tempo && tempo.isLoggedin) {
      window.location.replace("/Dashboard");
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ username_exist: false, email_exists: false });
    fetch("http://localhost:8080/people", {
      method: "POST",
      body: JSON.stringify(this.state.formData)
    }).then(response => {
      if (response.status >= 200 && response.status < 250) {
        this.setState({
          submitted: true,
          username_exist: false,
          email_exists: false
        });
        window.location.reload();
      } else if (response.status < 300) {
        this.setState({ username_exist: true, submitted: false });
      } else {
        this.setState({ submitted: false, email_exists: true });
      }
    });
  }

  handleFChange(event) {
    this.state.formData.FirstName = event.target.value;
  }
  handleLChange(event) {
    this.state.formData.LastName = event.target.value;
  }
  handleCChange(event) {
    this.state.formData.City = event.target.value;
  }
  handleUChange(event) {
    this.state.formData.Username = event.target.value;
  }
  handlePChange(event) {
    this.state.formData.Password = event.target.value;
  }
  handleEChange(event) {
    this.state.formData.Email = event.target.value;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Register as a new user</h1>
        </header>
        <br />
        <br />
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                value={this.state.FirstName}
                onChange={this.handleFChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                value={this.state.LastName}
                onChange={this.handleLChange}
                required
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                value={this.state.City}
                onChange={this.handleCChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                value={this.state.Email}
                onChange={this.handleEChange}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                title="Please enter a valid Email"
                required
              />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                value={this.state.Username}
                onChange={this.handleUChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={this.state.Password}
                onChange={this.handlePChange}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                required
              />
            </div>
            <button type="submit" className="btn btn-default">
              Submit
            </button>
          </form>
        </div>

        {this.state.submitted && (
          <div>
            <h2>New person successfully added.</h2>
            This has been printed using conditional rendering.
          </div>
        )}
        {this.state.username_exist && (
          <div>
            <h2>Username already exists</h2>
          </div>
        )}
        {this.state.email_exists && (
          <div>
            <h2>Username with this Email Id already exists</h2>
          </div>
        )}
      </div>
    );
  }
}

export default Register;
