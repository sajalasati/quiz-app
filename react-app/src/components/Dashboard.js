import React, { Component } from "react";
import "./Home.css";
import NewComponent from "./NewComponent";

class Dashboard extends Component {
  state = {};

  componentDidMount() {
    var tempo = JSON.parse(localStorage.getItem("session_data"));
    if (!tempo || !tempo.isLoggedin) {
      window.location.replace("/Login");
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Dashboard!</h1>
        </header>
        <NewComponent
          text={
            "QuizUp is a free, award-winning multiplayer trivia game. Challenge friends and meet new people who share your interests."
          }
        />
      </div>
    );
  }
}

export default Dashboard;
