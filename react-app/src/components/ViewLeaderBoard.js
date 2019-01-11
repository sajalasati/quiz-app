import React, { Component } from "react";
import "./ViewPeople.css";

class ViewLeaderBoard extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      display_genre: "",
      quiz_no: ""
    };
    this.handleGenre = this.handleGenre.bind(this);
    this.handleQuizNo = this.handleQuizNo.bind(this);
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    var tempo = JSON.parse(localStorage.getItem("session_data"));
    if (!tempo || !tempo.isLoggedin) {
      window.location.replace("/Login");
    }
    const request = new Request("http://127.0.0.1:8080/attempted/");
    fetch(request)
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
  }

  handleGenre(event) {
    this.setState({ display_genre: event.target.value });
  }

  handleQuizNo(event) {
    this.setState({ quiz_no: event.target.value });
  }

  render() {
    console.log(this.state.data);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All People in Leaderboard</h1>
        </header>
        <br />
        <select
          style={{}}
          required
          className="form-control"
          id="category"
          onChange={this.handleGenre}
        >
          <option value="">All Genres</option>
          <option value="Sports">Sports</option>
          <option value="GK">General Knowledge</option>
        </select>
        <select
          style={{}}
          required
          className="form-control"
          id="quiz_no"
          onChange={this.handleQuizNo}
        >
          <option value="">All Quizzes</option>
          <option value="1">Quiz-1</option>
          <option value="2">Quiz-2</option>
          <option value="3">Quiz-3</option>
          <option value="4">Quiz-4</option>
          <option value="5">Quiz-5</option>
        </select>
        <table className="table-hover">
          <thead>
            <tr>
              <th>Quiz No</th>
              <th>Category</th>
              <th>User Id</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data
              .filter(
                item =>
                  !this.state.display_genre ||
                  item.category === this.state.display_genre
              )
              .filter(
                item =>
                  !this.state.quiz_no || item.quiz_no === this.state.quiz_no
              )
              .map(function(item, key) {
                return (
                  <tr key={key}>
                    <td>{item.quiz_no}</td>
                    <td>{item.category}</td>
                    <td>{item.userid}</td>
                    <td>{item.score}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <hr />
      </div>
    );
  }
}

export default ViewLeaderBoard;
