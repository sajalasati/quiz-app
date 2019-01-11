import React, { Component } from "react";
import NewComponent from "./NewComponent";
import "./Home.css";

class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to QuizUp</h1>
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

export default Home;
