import React, { Component } from "react";
import "./AddQuestion.css";

class AddQuestion extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        statement: "",
        category: "",
        quiz_no: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        ansA: "",
        ansB: "",
        ansC: "",
        ansD: "",
        type: ""
      },
      submitted: false,
      invalid: false
    };
    this.handleStChange = this.handleStChange.bind(this);
    this.handleCaChange = this.handleCaChange.bind(this);
    this.handleQChange = this.handleQChange.bind(this);
    this.handleOAChange = this.handleOAChange.bind(this);
    this.handleOBChange = this.handleOBChange.bind(this);
    this.handleOCChange = this.handleOCChange.bind(this);
    this.handleODChange = this.handleODChange.bind(this);
    this.handleAAChange = this.handleAAChange.bind(this);
    this.handleABChange = this.handleABChange.bind(this);
    this.handleACChange = this.handleACChange.bind(this);
    this.handleADChange = this.handleADChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    var tempo = JSON.parse(localStorage.getItem("session_data"));
    if (!tempo || !tempo.isLoggedin) {
      window.location.replace("/Login");
    } else if (tempo && !tempo.isAdminLoggedin) {
      window.location.replace("/Dashboard");
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    var flag = 0;
    var e = document.getElementById("quiz_no");
    this.state.formData.quiz_no = e.options[e.selectedIndex].value;
    e = document.getElementById("category");
    this.state.formData.category = e.options[e.selectedIndex].value;
    const formData = { ...this.state.formData }; //clone the state
    if (document.getElementById("ansA").checked === true) {
      formData.ansA = "true";
      flag++;
    }
    if (document.getElementById("ansB").checked === true) {
      formData.ansB = "true";
      flag++;
    }
    if (document.getElementById("ansC").checked === true) {
      formData.ansC = "true";
      flag++;
    }
    if (document.getElementById("ansD").checked === true) {
      formData.ansD = "true";
      flag++;
    }
    console.log(JSON.stringify(formData));
    if (flag === 0) {
      this.setState({ invalid: false });
      return;
    }
    if (flag > 1) {
      formData.type = "multi";
    } else {
      formData.type = "";
    }
    fetch("http://localhost:8080/question", {
      method: "POST",
      body: JSON.stringify(formData)
    }).then(response => {
      if (response.status >= 200 && response.status < 300)
        this.setState({ submitted: true });
      window.location.reload();
    });
  }

  handleStChange(event) {
    this.state.formData.statement = event.target.value;
  }
  handleCaChange(event) {
    this.state.formData.category = event.target.value;
  }
  handleQChange(event) {
    this.state.formData.quiz_no = event.target.value;
  }
  handleOAChange(event) {
    this.state.formData.optionA = event.target.value;
  }
  handleOBChange(event) {
    this.state.formData.optionB = event.target.value;
  }
  handleOCChange(event) {
    this.state.formData.optionC = event.target.value;
  }
  handleODChange(event) {
    this.state.formData.optionD = event.target.value;
  }
  handleAAChange(event) {
    this.state.formData.ansA = event.target.value;
  }
  handleABChange(event) {
    this.state.formData.ansB = event.target.value;
  }
  handleACChange(event) {
    this.state.formData.ansC = event.target.value;
  }
  handleADChange(event) {
    this.state.formData.ansD = event.target.value;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Add a new Question</h1>
        </header>
        <br />
        <br />
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Statement</label>
              <input
                type="text"
                className="form-control"
                value={this.state.statement}
                onChange={this.handleStChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select required className="form-control" id="category">
                <option value="Sports">Sports</option>
                <option value="GK">General Knowledge</option>
              </select>
            </div>
            <div className="form-group">
              <label>Quiz Number</label>
              <select required className="form-control" id="quiz_no">
                <option value="1">Quiz-1</option>
                <option value="2">Quiz-2</option>
                <option value="3">Quiz-3</option>
                <option value="4">Quiz-4</option>
                <option value="5">Quiz-5</option>
              </select>
            </div>
            <div className="form-group">
              <label>Option A</label>
              <input
                type="text"
                className="form-control"
                value={this.state.optionA}
                onChange={this.handleOAChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Option B</label>
              <input
                type="text"
                className="form-control"
                value={this.state.optionB}
                onChange={this.handleOBChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Option C</label>
              <input
                type="text"
                className="form-control"
                value={this.state.optionC}
                onChange={this.handleOCChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Option D</label>
              <input
                type="text"
                className="form-control"
                value={this.state.optionD}
                onChange={this.handleODChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Answer A</label>
              <input
                id="ansA"
                type="checkbox"
                className="form-control"
                value={this.state.ansA}
                onChange={this.handleAAChange}
              />
            </div>
            <div className="form-group">
              <label>Answer B</label>
              <input
                id="ansB"
                type="checkbox"
                className="form-control"
                value={this.state.ansB}
                onChange={this.handleABChange}
              />
            </div>
            <div className="form-group">
              <label>Answer C</label>
              <input
                id="ansC"
                type="checkbox"
                className="form-control"
                value={this.state.ansC}
                onChange={this.handleACChange}
              />
            </div>
            <div className="form-group">
              <label>Answer D</label>
              <input
                id="ansD"
                type="checkbox"
                className="form-control"
                value={this.state.ansD}
                onChange={this.handleADChange}
              />
            </div>
            <button type="submit" className="btn btn-default">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddQuestion;
