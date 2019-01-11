import React, { Component } from "react";
import "./ViewQuiz.css";

//genres: all genres which are there in data

class DeleteQuiz extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      genres: [],
      quiz_nos: [],
      quiz_no: "",
      category: "",
      choice_submitted: false
    };
    this.handleCaChange = this.handleCaChange.bind(this);
    this.handleQChange = this.handleQChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleBackButton = this.handleBackButton.bind(this);
    // this.handleAns = this.handleAns.bind(this);
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

  // handleBackButton(event) {
  //   event.preventDefault();
  //   window.location.reload();
  // }

  // handleAns(event) {
  //   event.preventDefault();
  //   var ids = this.state.data.map(a => a.id);
  //   //if atleast one option attempted in each question => valid_marked(in quiz)=true
  //   for (var i = 0; i < ids.length; ++i) {
  //     if (
  //       !document.getElementById(ids[i] + "option1").checked &&
  //       !document.getElementById(ids[i] + "option2").checked &&
  //       !document.getElementById(ids[i] + "option3").checked &&
  //       !document.getElementById(ids[i] + "option4").checked
  //     ) {
  //       this.setState({ valid_marked: false });
  //       return;
  //     }
  //   }
  //   this.setState({ ans_submitted: true });
  //   this.setState({ valid_marked: true });
  //   var scores = 0;
  //   for (var i = 0; i < this.state.data.length; ++i) {
  //     var id = this.state.data[i].id;
  //     if (
  //       (document.getElementById(id + "option1").checked
  //         ? "true"
  //         : "" == this.state.data[i].AnsA) &&
  //       (document.getElementById(id + "option2").checked
  //         ? "true"
  //         : "" == this.state.data[i].AnsB) &&
  //       (document.getElementById(id + "option3").checked
  //         ? "true"
  //         : "" == this.state.data[i].AnsC) &&
  //       (document.getElementById(id + "option4").checked
  //         ? "true"
  //         : "" == this.state.data[i].AnsD)
  //     ) {
  //       scores += 1;
  //     }
  //   }
  //   var tempo = JSON.parse(localStorage.getItem("session_data"));
  //   this.setState({ score: scores });
  //   var data_obj = {
  //     userid: tempo.userid.toString(),
  //     category: this.state.category,
  //     quiz_no: this.state.quiz_no,
  //     score: scores.toString()
  //   };
  // }

  handleSubmit(event) {
    event.preventDefault();
    var e = document.getElementById("quiz_no");
    this.state.quiz_no = e.options[e.selectedIndex].value;
    e = document.getElementById("category");
    this.state.category = e.options[e.selectedIndex].value;
    return;
    // if (this.state.category == "" || this.state.quiz_no == "") {
    //   this.setState({ invalid: true });
    // } else {
    //   this.setState({ invalid: false });
    //   const formData = {
    //     category: this.state.category,
    //     quiz_no: this.state.quiz_no
    //   };
    //   var valueToSubmit = this.state.quiz_no + "/" + this.state.category;
    //   var url = "http://localhost:8080/quiz/" + valueToSubmit;
    //   var temp_data = [];
    //   fetch(url)
    //     .then(response => response.json())
    //     .then(data => this.setState({ data: data }));
    //   this.setState({ choice_submitted: true });
    //   var tempo = JSON.parse(localStorage.getItem("session_data"));
    //   var userid;
    //   var paramaters =
    //     this.state.quiz_no +
    //     "/" +
    //     this.state.category +
    //     "/" +
    //     tempo.userid.toString();
    //   if (!tempo.isAdminLoggedin) {
    //     var url = "http://127.0.0.1:8080/attempted/" + paramaters;
    //     fetch(url).then(response => {
    //       if (response.status >= 200 && response.status < 250) {
    //         this.setState({ already_done: true });
    //       } else {
    //         this.setState({ already_done: false });
    //       }
    //     });
    //   } else {
    //     this.setState({ already_done: false });
    //   }
    // }
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
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default DeleteQuiz;
