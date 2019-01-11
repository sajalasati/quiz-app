package main

import (
	"fmt"

	"github.com/gin-contrib/cors" // Why do we need this package?
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite" // If you want to use mysql or any other db, replace this line
)

var db *gorm.DB // declaring the db globally
var err error

type Person struct {
	ID        uint   `json:"id"`
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
	City      string `json:"city"`
	Email     string `json:"email"`
	Username  string `json:"username"`
	Password  string `json:"password"`
}

type Question struct {
	ID        uint   `json:"id"`
	Statement string `json:"statement"`
	Category  string `json:"category"`
	QuizNo    string `json:"quiz_no"`
	OptionA   string `json:optionA`
	OptionB   string `json:optionB`
	OptionC   string `json:optionC`
	OptionD   string `json:optionD`
	AnsA      string `json: ansA`
	AnsB      string `json: ansB`
	AnsC      string `json: ansC`
	AnsD      string `json: ansD`
	Type      string `json: type`
}

type Attempted struct {
	ID       uint   `json:"id"`
	UserId   string `json:"userid"`
	Username string `json:"username"`
	Category string `json:"category"`
	QuizNo   string `json:"quiz_no"`
	Score    string `json:"score"`
}

func main() {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()
	db.AutoMigrate(&Person{})
	db.AutoMigrate(&Question{})
	db.AutoMigrate(&Attempted{})
	r := gin.Default()
	r.GET("/people/", GetPeople)                                //ViewPeople.js : to list of all users
	r.GET("/people/:id", GetPerson)                             //get user with given id
	r.GET("/attempted/:quizno/:category/:userid", GetAttempted) //ViewQuiz.js to check whether this quiz was attempted for a user
	r.GET("/attempted/", ViewLeaderBoard)                       //ViewLeaderBoard.js : to display all data from Attempted table
	r.GET("/login", LoginPerson)                                //LoginPerson.js: to send all user entries
	r.POST("/people", Register)                                 //Register.js: to add new users to database
	r.POST("/question", AddQuestion)                            //to add question:AddQuestion.js
	r.GET("/question/", ViewQuestion)                           //to view all Questions: ViewQuestion.js
	r.GET("/quiz/:quizno/:category", ViewQuiz)                  // ViewQuiz.js : to view particular quiz
	r.DELETE("/quiz/:quizno/:category", DeleteQuiz)             // ViewQuiz.js : to view particular quiz
	r.POST("/quiz/", QuizAttempted)                             //***ViewQuiz.js: to submit the attempted quiz to Attempted table in database
	r.PUT("/people/:id", UpdatePerson)
	r.PUT("/question/:id", UpdateQuestion)
	r.DELETE("/people/:id", DeletePerson)     //DeletePerson.js : delete the user/person
	r.DELETE("/question/:id", DeleteQuestion) //ViewQuestion.js only : buttons provided to delete questions
	r.Use((cors.Default()))
	r.Run(":8080") // Run on port 8080
}

func DeletePerson(c *gin.Context) {
	id := c.Params.ByName("id")
	var person Person
	d := db.Where("id = ?", id).Delete(&person)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func DeleteQuestion(c *gin.Context) {
	id := c.Params.ByName("id")
	var question Question
	d := db.Where("id = ?", id).Delete(&question)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func DeleteQuiz(c *gin.Context) {
	quizno := c.Params.ByName("quizno")
	category := c.Params.ByName("category")
	var question Question
	d := db.Where("category = ? AND quiz_no = ?", category, quizno).Delete(&question)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"quiz_no #" + quizno: "deleted"})
	// delete that quiz plus the related records in Attempted table
}

func UpdatePerson(c *gin.Context) {
	var person Person
	id := c.Params.ByName("id")
	if err := db.Where("id = ?", id).First(&person).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}
	c.BindJSON(&person)
	db.Save(&person)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, person)
}

func UpdateQuestion(c *gin.Context) {
	var question Question
	id := c.Params.ByName("id")
	if err := db.Where("id = ?", id).First(&question).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}
	c.BindJSON(&question)
	db.Save(&question)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, question)
}

// func Register(c *gin.Context) {
// 	var person Person
// 	c.BindJSON(&person)
// 	fmt.Printf("%+v\n", person)
// 	db.Create(&person)
// 	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
// 	c.JSON(200, person)
// }

func Register(c *gin.Context) {
	var person Person
	c.BindJSON(&person)
	var row Person
	var row2 Person
	fmt.Printf("%+v\n", person)
	db.Where("username = ? ", person.Username).Find(&row)
	db.Where("email = ? ", person.Email).Find(&row2)
	fmt.Printf("%+v\n", row)
	fmt.Printf("%+v\n", row2)
	if (row == Person{} && row2 == Person{}) {
		db.Create(&person)
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, person)
	} else if (row2 == Person{}) {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(250, person)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(350, person)
	}
}

func QuizAttempted(c *gin.Context) {
	var attempted Attempted
	c.BindJSON(&attempted)
	db.Create(&attempted)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, attempted)
}

func AddQuestion(c *gin.Context) {
	var question Question
	c.BindJSON(&question)
	fmt.Println(question)
	db.Create(&question)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, question)
}

func GetPerson(c *gin.Context) {
	id := c.Params.ByName("id")
	var person Person
	if err := db.Where("id = ?", id).First(&person).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, person)
	}
}

func GetAttempted(c *gin.Context) {
	quizno := c.Params.ByName("quizno")
	category := c.Params.ByName("category")
	userid := c.Params.ByName("userid")
	var attempted Attempted
	fmt.Printf("%+v\n", attempted)
	if err := db.Where("category = ? AND quiz_no = ? AND user_id = ?", category, quizno, userid).First(&attempted).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}
	if (Attempted{}) == attempted {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(250, attempted)
		fmt.Println("No records for attempted quiz found")
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, attempted)
	}
}

func GetPeople(c *gin.Context) {
	var people []Person
	if err := db.Find(&people).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, people)
	}
}

func ViewQuestion(c *gin.Context) {
	//sends all the data in questions table
	var question []Question
	if err := db.Order("quiz_no").Find(&question).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, question)
	}
}

func ViewLeaderBoard(c *gin.Context) {
	var attempted []Attempted
	// db.Order("score desc").Order("quiz_no").Order("").Find(&attempted)
	if err := db.Order("quiz_no").Order("score desc").Find(&attempted).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, attempted)
	}
}

func ViewQuiz(c *gin.Context) {
	quiz_no := c.Params.ByName("quizno")
	category := c.Params.ByName("category")
	var question []Question
	if err := db.Where("category = ? AND quiz_no = ?", category, quiz_no).Find(&question).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, question)
	}
}

func LoginPerson(c *gin.Context) {
	var people []Person
	if err := db.Find(&people).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, people)
	}
}
