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
      genres: [],
      quiz_nos: [],
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

  handleBackButton(event) {
    event.preventDefault();
    window.location.reload();
  }
  handleLButton(event) {
    event.preventDefault();
    window.location.replace("/ViewLeaderboard");
  }

  handleAns(event) {
    event.preventDefault();
    var ids = this.state.data.map(a => a.id);
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
    this.setState({ ans_submitted: true });
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
    //dont store admin's quiz results to database
    if (!tempo.isAdminLoggedin) {
      fetch("http://localhost:8080/quiz/", {
        method: "POST",
        body: JSON.stringify(data_obj)
      }).then(response => {
        if (response.status >= 200 && response.status < 300)
          this.setState({ ans_submitted: true });
      });
    } else {
      this.setState({ ans_submitted: true });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.category == "" || this.state.quiz_no == "") {
      this.setState({ invalid: true });
    } else {
      this.setState({ invalid: false });
      const formData = {
        category: this.state.category,
        quiz_no: this.state.quiz_no
      };
      var valueToSubmit = this.state.quiz_no + "/" + this.state.category;
      var url = "http://localhost:8080/quiz/" + valueToSubmit;
      var temp_data = [];
      fetch(url)
        .then(response => response.json())
        .then(data => this.setState({ data: data }));
      this.setState({ choice_submitted: true });
      var tempo = JSON.parse(localStorage.getItem("session_data"));
      var userid;
      var paramaters =
        this.state.quiz_no +
        "/" +
        this.state.category +
        "/" +
        tempo.userid.toString();
      if (!tempo.isAdminLoggedin) {
        var url = "http://127.0.0.1:8080/attempted/" + paramaters;
        fetch(url).then(response => {
          if (response.status >= 200 && response.status < 250) {
            this.setState({ already_done: true });
          } else {
            this.setState({ already_done: false });
          }
        });
      } else {
        this.setState({ already_done: false });
      }
    }
  }

  handleCaChange(event) {
    // this.setState({ category: event.target.value });
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
                <select
                  required
                  className="form-control"
                  id="category"
                  onChange={this.handleCaChange}
                >
                  <option value="">---select---</option>
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
                  <option value="">---select---</option>
                  {this.state.quiz_nos.map(function(item, key) {
                    return (
                      <option value={item}>
                        Quiz-
                        {item}
                      </option>
                    );
                  })}
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
            <h1 className="App-title">
              Welcome to {this.state.category} Quiz-
              {this.state.quiz_no}
            </h1>
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
          <button onClick={this.handleLButton}>Go To Leaderboard</button>
          <hr />
        </div>
      );
    }
  }
}

export default ViewQuiz;
