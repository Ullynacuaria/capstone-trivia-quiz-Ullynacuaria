// To run this assignment, right click on index.html in the Visual Studio Code file explorer to the left
// and select "Open with Live Server"

// YOUR CODE HERE!

// My globe variables:
let question;
let cluesArray;
let category;
let correctAnwser;
let index
let score = 0

//(fetch) Get a category's ID from a random question:
function getRandomClueData(data) {
  const randomClueUrl = `https://jservice.kenzie.academy/api/random-clue?valid=true`;
  return fetch(randomClueUrl)
    .then((response) => response.json())
    .then(getCategoryId);
}
// (fetch) Get 100 random question clues by Category
function getCategoryId(data) {
  const randomId = data.categoryId;
  const newUlr = `https://jservice.kenzie.academy/api/clues?category=${randomId}`;
  return fetch(newUlr)
    .then((response) => response.json())
    .then(getRandomQuestion)
}
//getRandomClueData;
let div = document.querySelector("#questionbox")
div.classList.add("answer")
function getRandomQuestion(data) {
    cluesArray = data.clues;
    displayQuestion()
}

//display question randomly:
function displayQuestion(){
  index = Math.floor(Math.random() * cluesArray.length);
  category = cluesArray[index].category.title;
  question = cluesArray[index].question;
  div.innerHTML = `<h3>Title: ${category}:</h3> <h4>${question}</4>`
  div.dataset.answer = cluesArray[index].answer.toLowerCase();
  console.log(div.dataset.answer)
  //startQuiz.append(div)
}

// Get input form and addEventListener:
const userInput = document.querySelector("#input");
userInput.addEventListener("submit", formInput)

function formInput(event) {
    event.preventDefault();
    let currentAnswer = userInput.answer
    currentAnswer = userInput.answer.value.toLowerCase()
    let points = document.querySelector("#score")
    const answers = document.querySelector(".answer").getAttribute("data-answer")
    let resultbox = document.querySelector("#resultbox")
    //Correct Answers:
    if(currentAnswer === answers){
      score ++,
        points.innerText = `points: ${score}`
        resultbox.innerHTML = ` Correct! Great Your Score Is Now ${score}!`
        resultbox.classList.toggle("correctanswer")
        userInput.value = ""
        cluesArray.splice(index, 1)
        if(cluesArray.length > 0){
          setTimeout(() => {
             resultbox.innerHTML = ""
            displayQuestion()}, 3000)
        }else{
         setTimeout(() => {
           resultbox.innerHTML = "" 
          getRandomClueData()}, 3000)
        }
        
      }
      //Incorrect Answers
      if(currentAnswer !== answers){
        score = 0,
        points.innerText = `points: ${score}`
        resultbox.innerHTML = ` Wrong Answer!`
        resultbox.classList.toggle("wronganswer")
        console.log("naaa")
        setTimeout(() => {
           resultbox.innerHTML = ""
          getRandomClueData()}, 3000)
          startGame()
      }
      userInput.reset()
    }
    
//Get start button and ddEventListener:
const startbutton = document.querySelector("#startbtn")
const startQuiz = document.querySelector("#quiz")
startbutton.addEventListener("click", startGame)

//Show and hide game:
function startGame(){
    console.log("started")
     startQuiz.classList.remove("hide")
     startbutton.innerHTML= "Reset game"
     getRandomClueData()
}


  