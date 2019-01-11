# Quiz App

This is a simple quiz portal designed using React.js and Go-lang.

## About

I have to written a Go server that implements REST API and interacts with the database at the backend. The front end is a React application that is an interactive quiz.

## Installing Dependencies:

To setup the given project follow the instructions separately for each:

### GO

- To install Go on ubuntu [Look here](https://www.linode.com/docs/development/go/install-go-on-ubuntu/)
- Next, to install other packages used in this, run following commands from terminal:
  - go get -u -v github.com/gin-gonic/gin
  - go get -u -v github.com/jinzhu/gorm
  - go get -u -v github.com/jinzhu/gorm/dialects/sqlite
  - go get -u -v github.com/gin-contrib/cors# Quiz App

This is a simple quiz portal designed using React.js and Go-lang.

### React

- First, install node. Then install yarn.

## How to run the Application:

- Download the project
- React
  - cd react-app
  - Run `yarn install` or simply `yarn` to install all dependencies
  - If no error is encountered then run `yarn start`
- Go
  - cd go
  - cd src
  - go run '5 - CRUD API.go'

## Features:

- Registration and login for users
- Sign Up requires email and username to be unique
- Multiple genre of quizzes - Friends, Cricket, General Knowledge, Maths
- Multiple types of questions,MCQ, Single Correct.
- Leaderboard
- Lifeline
- Attempted quiz history
- Admin privileges to one user. He has privilege to do the following:
  - View/Create/Delete quizzes
  - Create/Delete/Edit questions/options in each quiz
  - Create a new genre
  - View all users
  - Delete users
- The score is displayed after submitting the quiz and entry in leaderboard is made.
- View complete perfomance by viewing the results of previous quizzes attempted.

### Owner: Sajal Asati
