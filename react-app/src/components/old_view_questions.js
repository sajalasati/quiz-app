import React, { Component } from "react";
import "./ViewPeople.css";

class ViewQuestion extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      display_genre: "",
      quiz_no: "",
      genres: [],
      none_selected_for_delete: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGenre = this.handleGenre.bind(this);
    this.handleQuizNo = this.handleQuizNo.bind(this);
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    var tempo = JSON.parse(localStorage.getItem("session_data"));
    if (!tempo || !tempo.isLoggedin) {
      window.location.replace("/Login");
    } else if (tempo && !tempo.isAdminLoggedin) {
      window.location.replace("/Dashboard");
    }
    const request = new Request("http://127.0.0.1:8080/question/");
    fetch(request)
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
    // const request = new Request("http://127.0.0.1:8080/question/");
    // fetch(request)
    //   .then(response => response.json())
    //   .then(data => {
    //     this.setState({ data: data });
    //     var mySet = new Set();
    //     // mySet = data.map();
    //     data.map(function(item, key) {
    //       mySet.add(item.category);
    //     });
    //     let array = Array.from(mySet);
    //     this.setState({ genres: array });
    //   });
  }

  handleGenre(event) {
    this.setState({ display_genre: event.target.value });
  }

  handleQuizNo(event) {
    this.setState({ quiz_no: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    var valueToSubmit = document.querySelector(
      'input[name="optradio"]:checked'
    );
    if (valueToSubmit) {
      console.log(valueToSubmit);
      valueToSubmit = valueToSubmit.value;
      var url = "http://localhost:8080/question/" + valueToSubmit;
      fetch(url, {
        method: "DELETE"
      });
      window.location.reload();
    } else {
      // this.setState({ none_selected_for_delete: true });
      return;
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All Questions</h1>
        </header>
        <br />
        <select
          required
          className="form-control"
          id="category"
          onChange={this.handleGenre}
        >
          <option value="">Select Genre --</option>
          <option value="Sports">Sports</option>
          <option value="GK">General Knowledge</option>
        </select>
        <select
          required
          className="form-control"
          id="quiz_no"
          onChange={this.handleQuizNo}
        >
          <option value="">Select Quiz No --</option>
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
              <th>Statement</th>
              <th>Category</th>
              <th>OptionA</th>
              <th>OptionB</th>
              <th>OptionC</th>
              <th>OptionD</th>
              <th>AnsA</th>
              <th>AnsB</th>
              <th>AnsC</th>
              <th>AnsD</th>
              <th>Delete</th>
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
                    <td>{item.statement}</td>
                    <td>{item.category}</td>
                    <td>{item.OptionA}</td>
                    <td>{item.OptionB}</td>
                    <td>{item.OptionC}</td>
                    <td>{item.OptionD}</td>
                    <td>{item.AnsA}</td>
                    <td>{item.AnsB}</td>
                    <td>{item.AnsC}</td>
                    <td>{item.AnsD}</td>
                    <td>
                      <input type="radio" name="optradio" value={item.id} />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <hr />
        <button onClick={this.handleSubmit}>Delete Question</button>
        {this.state.none_selected_for_delete && (
          <div>
            <h2>Select atleast one option to delete.</h2>
          </div>
        )}
      </div>
    );
  }
}

export default ViewQuestion;
