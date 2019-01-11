import React, { Component } from "react";
import "./ViewQuiz.css";

//genres: all genres which are there in data
//success : (debug) if the quiz was deleted or not

class DeleteQuiz extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      genres: [],
      quiz_nos: [],
      quiz_no: "",
      category: "",
      choice_submitted: false,
      invalid: false,
      success: true
    };
    this.handleCaChange = this.handleCaChange.bind(this);
    this.handleQChange = this.handleQChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    var tempo = JSON.parse(localStorage.getItem("session_data"));
    if (!tempo || !tempo.isLoggedin) {
      window.location.replace("/Login");
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
      this.setState({ invalid: false });
      var valueToSubmit = this.state.quiz_no + "/" + this.state.category;
      var url = "http://localhost:8080/quiz/" + valueToSubmit;
      fetch(url, {
        method: "DELETE"
      }).then(response => {
        if (response.status > 300) {
          this.setState({ success: false });
        } else {
          window.location.reload();
        }
      });
    }
  }

  handleCaChange(event) {
    // console.log(event.target.value);
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

  render() {
    console.log(this.state.data);
    console.log("fuck1", this.state.genres);
    console.log("fuck2", this.state.quiz_nos);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            Select a Category and its Quiz No to delete
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
              Delete Quiz
            </button>
          </form>
          {this.state.invalid && <h3>Select atleast one option to delete.</h3>}
          {!this.state.success && <h3>Could not delete the selected quiz</h3>}
        </div>
      </div>
    );
  }
}

export default DeleteQuiz;
