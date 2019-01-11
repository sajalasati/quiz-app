import React, { Component } from "react";
import DeletePerson from "./DeletePerson";
import ViewPeople from "./ViewPeople";
import EditPerson from "./EditPerson";
import Register from "./Register";
import LoginPerson from "./LoginPerson";
import LogoutPerson from "./LogoutPerson";
import Home from "./Home";
import NavBar from "./navbar";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";
import AddQuestion from "./AddQuestion";
import ViewQuestion from "./ViewQuestion";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <NavBar />
      </React.Fragment>
    );
  }
}

export default App;
