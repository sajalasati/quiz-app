import React, { Component } from "react";
import "./ViewQuiz.css";

class EditQuiz extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      genres: [],
      quiz_nos: [],
      quiz_no: "",
      category: "",
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
        ansD: ""
      },
      choice_submitted: false,
      invalid: false,
      success: true,
      garbage: ""
    };
    this.handleStChange = this.handleStChange.bind(this);
    this.handleOAChange = this.handleOAChange.bind(this);
    this.handleOBChange = this.handleOBChange.bind(this);
    this.handleOCChange = this.handleOCChange.bind(this);
    this.handleODChange = this.handleODChange.bind(this);
    this.handleAAChange = this.handleAAChange.bind(this);
    this.handleABChange = this.handleABChange.bind(this);
    this.handleACChange = this.handleACChange.bind(this);
    this.handleADChange = this.handleADChange.bind(this);
    this.handleCaChange = this.handleCaChange.bind(this);
    this.handleQChange = this.handleQChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSaveChanges = this.handleSaveChanges.bind(this);
    this.handleBackChanges = this.handleBackChanges.bind(this);
  }

  componentDidMount() {
    var tempo = JSON.parse(localStorage.getItem("session_data"));
    if (!tempo || !tempo.isLoggedin) {
      window.location.replace("/Login");
    } else if (tempo && !tempo.isAdminLoggedin) {
      window.location.replace("/Dashboard");
    }
    const request = new Request("http://127.0.0.1:8080/question/");
    fetch(request)
      .then(response => response.json())
      .then(data => {
        this.setState({ data: data });
        var mySet = new Set();
        data.map(function(item, key) {
          mySet.add(item.category);
        });
        let array = Array.from(mySet);
        this.setState({ genres: array });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ success: true });
    if (this.state.category == "" || this.state.quiz_no == "") {
      this.setState({ invalid: true });
    } else {
      this.setState({ invalid: false, choice_submitted: true });
    }
  }

  handleBackChanges(event) {
    window.location.reload();
  }

  handleSaveChanges(event) {
    event.preventDefault();
    var tempthis = this;
    var temp = event.target.value;
    console.log(temp);
    this.state.formData = this.state.data[temp];
    console.log("maadarchod", this.state.data[temp]);
    fetch("http://localhost:8080/question/" + event.target.id, {
      method: "PUT",
      body: JSON.stringify(this.state.data[temp])
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        this.setState({ garbage: event.target.id });
      }
    });
  }

  handleCaChange(event) {
    var quiz_no_array = [];
    var val = event.target.value;
    this.setState({ category: val });
    if (!val || val === "") {
      this.setState({ quiz_nos: quiz_no_array });
    } else {
      var temp = [];
      console.log(val);
      this.state.data
        .filter(item => item.category === val)
        .map(function(item, key) {
          temp.push(item.quiz_no);
        });
      console.log("temp is", val);
      var mySet = new Set(temp.sort());
      let arr = Array.from(mySet);
      console.log(arr);
      this.setState({ quiz_nos: arr });
    }
  }

  handleQChange(event) {
    //should not change
    this.setState({ quiz_no: event.target.value });
  }

  handleStChange(event) {
    var tempthis = this;
    var temp = Number(event.target.id);
    this.state.data[temp].statement = event.target.value;
    this.setState({ data: tempthis.state.data });
  }

  handleOAChange(event) {
    var tempthis = this;
    var temp = Number(event.target.id);
    this.state.data[temp].OptionA = event.target.value;
    this.setState({ data: tempthis.state.data });
  }
  handleOBChange(event) {
    var tempthis = this;
    var temp = Number(event.target.id);
    this.state.data[temp].OptionB = event.target.value;
    this.setState({ data: tempthis.state.data });
  }
  handleOCChange(event) {
    var tempthis = this;
    var temp = Number(event.target.id);
    this.state.data[temp].OptionC = event.target.value;
    this.setState({ data: tempthis.state.data });
  }
  handleODChange(event) {
    var tempthis = this;
    console.log(event.target.id);
    var temp = Number(event.target.id);
    this.state.data[temp].OptionD = event.target.value;
    this.setState({ data: tempthis.state.data });
  }
  handleAAChange(event) {
    var tempthis = this;
    var idd = event.target.id;
    console.log(idd);
    var temp = Number(event.target.value);
    if (document.getElementById(idd).checked === true) {
      this.state.data[temp].AnsA = "true";
    } else {
      this.state.data[temp].AnsA = "";
    }
    // console.log(event.target.checked);
    // this.state.data[temp].AnsA = event.target.value;
    this.setState({ data: tempthis.state.data });
  }
  handleABChange(event) {
    var tempthis = this;
    var idd = event.target.id;
    var temp = Number(event.target.value);
    if (document.getElementById(idd).checked === true) {
      this.state.data[temp].AnsB = "true";
    } else {
      this.state.data[temp].AnsB = "";
    }
    // this.state.data[temp].AnsB = event.target.value;
    this.setState({ data: tempthis.state.data });
  }
  handleACChange(event) {
    var tempthis = this;
    var idd = event.target.id;
    var temp = Number(event.target.value);
    if (document.getElementById(idd).checked === true) {
      this.state.data[temp].AnsC = "true";
    } else {
      this.state.data[temp].AnsC = "";
    }
    // this.state.data[temp].AnsC = event.target.value;
    this.setState({ data: tempthis.state.data });
  }
  handleADChange(event) {
    var tempthis = this;
    var idd = event.target.id;
    var temp = Number(event.target.value);
    if (document.getElementById(idd).checked === true) {
      this.state.data[temp].AnsD = "true";
    } else {
      this.state.data[temp].AnsD = "";
    }
    this.setState({ data: tempthis.state.data });
  }

  render() {
    let a = this;
    let counting = 0;
    if (!this.state.choice_submitted) {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">
              Select a Category and Quiz No. to Edit
            </h1>
          </header>
          <br />
          <br />
          <div className="formContainer">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Category</label>
                <select
                  required
                  className="form-control"
                  id="category"
                  onChange={this.handleCaChange}
                >
                  <option value="">---select category---</option>
                  {this.state.genres.map(function(item, key) {
                    return <option value={item}>{item}</option>;
                  })}
                </select>
              </div>
              <div className="form-group">
                <label>Quiz Number</label>
                <select
                  required
                  className="form-control"
                  id="quiz_no"
                  onChange={this.handleQChange}
                >
                  <option value="">---select quiz no---</option>
                  {this.state.quiz_nos.map(function(item, key) {
                    return <option value={item}>{item}</option>;
                  })}
                </select>
              </div>
              <button
                onClick={this.handleSubmit}
                type="submit"
                className="btn btn-default"
              >
                Edit Quiz
              </button>
            </form>
            {this.state.invalid && (
              <h3>Select atleast one option to delete.</h3>
            )}
            {!this.state.success && <h3>Could not delete the selected quiz</h3>}
          </div>
        </div>
      );
    } else {
      //dont display category and quiz no for edit
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">
              Edit {this.state.category} Quiz-
              {this.state.quiz_no}
            </h1>
          </header>
          <br />
          <br />
          <div className="formContainer">
            {this.state.data
              .filter(item => item.category === this.state.category)
              .filter(item => item.quiz_no === this.state.quiz_no)
              .map(function(item, key) {
                return (
                  <form>
                    <h2>
                      Question-
                      {++counting}
                    </h2>
                    <div className="form-group">
                      <label>Statement</label>
                      <input
                        type="text"
                        id={key}
                        className="form-control"
                        value={item.statement}
                        onChange={a.handleStChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Option A</label>
                      <input
                        type="text"
                        id={key}
                        className="form-control"
                        value={item.OptionA}
                        onChange={a.handleOAChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Option B</label>
                      <input
                        type="text"
                        id={key}
                        className="form-control"
                        value={item.OptionB}
                        onChange={a.handleOBChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Option C</label>
                      <input
                        type="text"
                        id={key}
                        className="form-control"
                        value={item.OptionC}
                        onChange={a.handleOCChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Option D</label>
                      <input
                        type="text"
                        id={key}
                        className="form-control"
                        value={item.OptionD}
                        onChange={a.handleODChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Answer A</label>
                      <input
                        id={key.toString(10) + "AnsA"}
                        type="checkbox"
                        className="form-control"
                        onChange={a.handleAAChange}
                        value={key}
                      />
                    </div>
                    <div className="form-group">
                      <label>Answer B</label>
                      <input
                        id={key.toString(10) + "AnsB"}
                        type="checkbox"
                        className="form-control"
                        value={key}
                        onChange={a.handleABChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Answer C</label>
                      <input
                        id={key.toString(10) + "AnsC"}
                        type="checkbox"
                        className="form-control"
                        value={key}
                        onChange={a.handleACChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Answer D</label>
                      <input
                        id={key.toString(10) + "AnsD"}
                        type="checkbox"
                        className="form-control"
                        value={key}
                        onChange={a.handleADChange}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      id={item.id}
                      value={key}
                      onClick={a.handleSaveChanges}
                    >
                      Submit
                    </button>

                    <hr />
                    <hr />
                  </form>
                );
              })}
          </div>
          <button
            type="submit"
            className="btn btn-info"
            onClick={a.handleBackChanges}
          >
            Go Back
          </button>
        </div>
      );
    }
  }
}
export default EditQuiz;
