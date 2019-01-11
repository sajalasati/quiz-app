import React, { Component } from "react";
import "./Login.css";

class LoginPerson extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        username: "",
        password: ""
      },
      data: [],
      session_data: {
        isLoggedin: false,
        isAdminLoggedin: false,
        username: "",
        userid: ""
      },
      cheating: false
    };
    this.handleUChange = this.handleUChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //in component did mount function dont allow this page to be rendered if session_data is set
  // redirect to dashboard
  componentDidMount() {
    var tempo = JSON.parse(localStorage.getItem("session_data"));
    if (tempo && tempo.isLoggedin) {
      window.location.replace("/Dashboard");
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    var flag = 0;
    const request = new Request("http://127.0.0.1:8080/login");
    fetch(request)
      .then(response => response.json())
      .then(data => {
        const session_data = { ...this.state.session_data };
        this.setState({ data });
        for (var i = 0; i < this.state.data.length; ++i) {
          if (
            data[i].username === this.state.formData.username &&
            data[i].password === this.state.formData.password
          ) {
            flag = 1;
            if (this.state.formData.username === "admin") {
              session_data.isLoggedin = true;
              session_data.isAdminLoggedin = true;
              session_data.username = this.state.formData.username;
              session_data.userid = data[i].id;
            } else {
              session_data.isLoggedin = true;
              session_data.username = this.state.formData.username;
              session_data.userid = data[i].id;
            }
            localStorage.setItem("session_data", JSON.stringify(session_data));
            window.location.replace("/");
            break;
          }
        }
        if (flag === 0) {
          this.setState({ cheating: true });
        }
      });
  }

  handleUChange(event) {
    this.state.formData.username = event.target.value;
  }
  handlePChange(event) {
    this.state.formData.password = event.target.value;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">User Login</h1>
        </header>
        <br />
        <br />
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                value={this.state.username}
                onChange={this.handleUChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={this.state.password}
                onChange={this.handlePChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-default">
              Submit
            </button>
            {this.state.cheating && (
              <div>
                <h3 className="text-danger">Credentials did not match!!</h3>
                <hr />
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPerson;
