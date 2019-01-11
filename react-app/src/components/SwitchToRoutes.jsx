import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DeletePerson from "./DeletePerson";
import ViewPeople from "./ViewPeople";
import EditPerson from "./EditPerson";
import Register from "./Register";
import LoginPerson from "./LoginPerson";
import LogoutPerson from "./LogoutPerson";
import Home from "./Home";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";
import AddQuestion from "./AddQuestion";
import ViewQuestion from "./ViewQuestion";
import ViewQuiz from "./ViewQuiz";
import ViewLeaderBoard from "./ViewLeaderBoard";
import DeleteQuiz from "./DeleteQuiz";
import EditQuiz from "./EditQuiz";

const SwitchToroutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/Dashboard" component={Dashboard} />
      <Route exact path="/Register" component={Register} />
      <Route exact path="/EditPerson" component={EditPerson} />
      <Route exact path="/AddQuestion" component={AddQuestion} />
      <Route exact path="/DeleteQuiz" component={DeleteQuiz} />
      <Route exact path="/EditQuiz" component={EditQuiz} />
      <Route exact path="/ViewQuestion" component={ViewQuestion} />
      <Route exact path="/ViewLeaderBoard" component={ViewLeaderBoard} />
      <Route exact path="/TakeQuiz" component={ViewQuiz} />
      <Route exact path="/DeletePerson" component={DeletePerson} />
      <Route exact path="/ViewPeople" component={ViewPeople} />
      <Route exact path="/Login" component={LoginPerson} />
      <Route exact path="/Logout" component={LogoutPerson} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default SwitchToroutes;
