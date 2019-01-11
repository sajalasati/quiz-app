import React, { Component } from "react";
import SwitchToRoutes from "./SwitchToRoutes";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const NavBar = props => {
  const session_data = JSON.parse(localStorage.getItem("session_data"));
  if (!session_data || (session_data && !session_data.isLoggedin)) {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link className="navbar-brand" to={"/"}>
                  QuizUp
                </Link>
              </div>
              <ul className="nav navbar-nav">
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/Login"}>Login</Link>
                </li>
                <li>
                  <Link to={"/Register"}>Register</Link>
                </li>
              </ul>
            </div>
          </nav>
          <SwitchToRoutes />
        </div>
      </Router>
    );
  } else if (session_data.isAdminLoggedin) {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link className="navbar-brand" to={"/"}>
                  QuizUp
                </Link>
              </div>
              <ul className="nav navbar-nav">
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/Dashboard"}>Dashboard</Link>
                </li>
                <li>
                  <Link to={"/Logout"}>Logout</Link>
                </li>
                <li>
                  <Link to={"/ViewPeople"}>View People</Link>
                </li>
                <li>
                  <Link to={"/DeletePerson"}>Delete Person</Link>
                </li>
                <li>
                  <Link to={"/ViewLeaderBoard"}>Leaderboard</Link>
                </li>
                <li>
                  <Link to={"/AddQuestion"}>Add Question</Link>
                </li>
                <li>
                  <Link to={"/EditQuiz"}>Edit Quiz</Link>
                </li>
                <li>
                  <Link to={"/DeleteQuiz"}>Delete Quiz</Link>
                </li>
                <li>
                  <Link to={"/ViewQuestion"}>View Question</Link>
                </li>

                <li>
                  <Link to={"/TakeQuiz"}>Take Quiz</Link>
                </li>
              </ul>
            </div>
          </nav>
          <SwitchToRoutes />
        </div>
      </Router>
    );
  } else {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link className="navbar-brand" to={"/"}>
                  QuizUp
                </Link>
              </div>
              <ul className="nav navbar-nav">
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/Dashboard"}>Dashboard</Link>
                </li>
                <li>
                  <Link to={"/TakeQuiz"}>Take Quiz</Link>
                </li>
                <li>
                  <Link to={"/ViewLeaderBoard"}>Leaderboard</Link>
                </li>
                <li>
                  <Link to={"/Logout"}>Logout</Link>
                </li>
              </ul>
            </div>
          </nav>
          <SwitchToRoutes />
        </div>
      </Router>
    );
  }
};

export default NavBar;
