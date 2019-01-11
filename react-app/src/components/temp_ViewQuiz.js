import React, { Component } from "react";
import "./ViewQuiz.css";

//category of quiz selected
//quiz_no selected
//data : filtered questions
//data2 : if quiz+genre+userid already present
//invalid tag: to see whether a valid category/quiz_no for a quiz was selected or not
//choice_submitted : for choice of genre and quiz number succesfully submitted to database
//valid_marked : if all questions were attempted or not
//ans_submitted : means answer was submitted successfully

class ViewQuiz extends Component {
  constructor() {
    super();
    this.state = {
      category: "",
      quiz_no: "",
      data: [],
      data2: [],
      ids: [],
      score: "",
      choice_submitted: false,
      ans_submitted: false,
      valid_marked: true,
      invalid: false,
      already_done: false
    };
    this.handleCaChange = this.handleCaChange.bind(this);
    this.handleQChange = this.handleQChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.handleAns = this.handleAns.bind(this);
  }

  handleBackButton(event) {
    this.setState({ choice_submitted: true });
    window.location.reload();
  }

  handleAns(event) {
    event.preventDefault();
    if (this.state.ans_submitted) {
      //if again the button was pressed, button will reload whole route
      window.location.reload();
    } else {
      var ids = this.state.data.map(a => a.id);
      this.setState({ ans_submitted: true });
      //if atleast one option attempted in each question => valid_marked(in quiz)=true
      for (var i = 0; i < ids.length; ++i) {
        if (
          !document.getElementById(ids[i] + "option1").checked &&
          !document.getElementById(ids[i] + "option2").checked &&
          !document.getElementById(ids[i] + "option3").checked &&
          !document.getElementById(ids[i] + "option4").checked
        ) {
          this.setState({ valid_marked: false });
          return;
        }
      }
      this.setState({ valid_marked: true });
      var scores = 0;
      for (var i = 0; i < this.state.data.length; ++i) {
        var id = this.state.data[i].id;
        if (
          (document.getElementById(id + "option1").checked
            ? "true"
            : "" == this.state.data[i].AnsA) &&
          (document.getElementById(id + "option2").checked
            ? "true"
            : "" == this.state.data[i].AnsB) &&
          (document.getElementById(id + "option3").checked
            ? "true"
            : "" == this.state.data[i].AnsC) &&
          (document.getElementById(id + "option4").checked
            ? "true"
            : "" == this.state.data[i].AnsD)
        ) {
          scores += 1;
        }
      }
      var tempo = JSON.parse(localStorage.getItem("session_data"));
      this.setState({ score: scores });
      var data_obj = {
        userid: tempo.userid.toString(),
        category: this.state.category,
        quiz_no: this.state.quiz_no,
        score: scores.toString()
      };
      //submit the answer to database => attempted questions table
      fetch("http://localhost:8080/quiz/", {
        method: "POST",
        body: JSON.stringify(data_obj)
      }).then(response => {
        if (response.status >= 200 && response.status < 300)
          this.setState({ ans_submitted: true });
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    var e = document.getElementById("quiz_no");
    this.state.quiz_no = e.options[e.selectedIndex].value;
    e = document.getElementById("category");
    this.state.category = e.options[e.selectedIndex].value;
    if (this.state.category == "" || this.state.quiz_no == "") {
      this.setState({ invalid: true });
    } else {
      const formData = {
        category: this.state.category,
        quiz_no: this.state.quiz_no
      };
      var valueToSubmit = this.state.quiz_no + "/" + this.state.category;
      var url = "http://localhost:8080/quiz/" + valueToSubmit;
      fetch(url)
        .then(response => response.json())
        .then(data => this.setState({ data: data }));
      if (this.state.data.length !== 0) {
        this.setState({ choice_submitted: true });
        var paramaters = this.state.quiz_no + "/" + this.state.category;
        var url = "http://127.0.0.1:8080/attempted/" + paramaters;
        fetch(url)
          .then(response => response.json())
          .then(data2 => this.setState({ data2: data2 }));
        if (this.state.data2.length !== 0) {
          this.setState({ already_done: true });
        } else {
          this.setState({ already_done: false });
        }
      } else {
        return;
      }
    }
  }

  handleCaChange(event) {
    this.setState({ category: event.target.value });
  }
  handleQChange(event) {
    this.setState({ quiz_no: event.target.value });
  }

  render() {
    console.log("new rendering");
    console.log("data2", this.state.data2);
    console.log("data", this.state.data);
    console.log("already_done", this.state.already_done);
    console.log("ans_submitted", this.state.ans_submitted);
    console.log("choice_submitted", this.state.choice_submitted);
    if (!this.state.choice_submitted) {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">
              Select Category and Quiz No to proceed
            </h1>
          </header>
          <br />
          <br />
          <div className="formContainer">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Category</label>
                <select required className="form-control" id="category">
                  <option value="">---select---</option>
                  <option value="Sports">Sports</option>
                  <option value="GK">General Knowledge</option>
                </select>
              </div>
              <div className="form-group">
                <label>Quiz Number</label>
                <select required className="form-control" id="quiz_no">
                  <option value="">---select---</option>
                  <option value="1">Quiz-1</option>
                  <option value="2">Quiz-2</option>
                  <option value="3">Quiz-3</option>
                  <option value="4">Quiz-4</option>
                  <option value="5">Quiz-5</option>
                </select>
              </div>
              <button
                onClick={this.handleSubmit}
                type="submit"
                className="btn btn-default"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to Quiz</h1>
          </header>
          <form onSubmit={this.handleAns}>
            {this.state.data.map(function(item, key) {
              return (
                <p id={item.id}>
                  <h2>Question: {item.statement}</h2>
                  <label className="container">
                    {item.OptionA}
                    <input
                      type="checkbox"
                      className="1"
                      id={item.id + "option1"}
                      value="A"
                    />
                    <span className="checkmark" />
                  </label>
                  <label className="container">
                    {item.OptionB}
                    <input
                      type="checkbox"
                      className="2"
                      value="B"
                      id={item.id + "option2"}
                    />
                    <span className="checkmark" />
                  </label>
                  <label className="container">
                    {item.OptionC}
                    <input
                      type="checkbox"
                      className="3"
                      value="C"
                      id={item.id + "option3"}
                    />
                    <span className="checkmark" />
                  </label>
                  <label className="container">
                    {item.OptionD}
                    <input
                      type="checkbox"
                      className="4"
                      value="D"
                      id={item.id + "option4"}
                    />
                    <span className="checkmark" />
                  </label>
                </p>
              );
            })}
            {!this.state.already_done &&
              !this.state.ans_submitted && (
                <button
                  onClick={this.handleAns}
                  type="submit"
                  className="btn btn-default"
                >
                  Submit
                </button>
              )}
            {this.state.already_done && (
              <h3 className="bg-danger">You already attempted this Quiz</h3>
            )}
          </form>
          <hr />
          {!this.state.valid_marked && (
            <div>
              <h2>Please attempt all questions</h2>
            </div>
          )}
          {this.state.ans_submitted && (
            <div>
              <h2>Your Score: {this.state.score}</h2>
            </div>
          )}
          <hr />
          <button onClick={this.handleBackButton}>Go Back To Main Page</button>
          <hr />
        </div>
      );
    }
  }
}

export default ViewQuiz;
