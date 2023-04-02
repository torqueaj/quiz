const api_url = "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple"
const submit_button = document.querySelector("#submit")
const reset_button = document.querySelector("#rbutton")
const display_score=document.querySelector(".score")
let question_num = 0
let quiz_score = 0
let info
let quiz_container = document.querySelector("#quiz-container")
let container = document.querySelector(".container")
let question_heading = document.querySelector("h3")
const input = document.querySelectorAll("input")
const option_a = document.querySelector("#a")
const option_b = document.querySelector("#b")
const option_c = document.querySelector("#c")
const option_d = document.querySelector("#d")
let shuffled_options = []
let answer = 0
// let reset_button_new



function update_questions() {
    question_heading.innerHTML = info[question_num].question
    let arr = info[question_num].incorrect_answers.concat([info[question_num].correct_answer])
    shuffled_options = shuffleOption(arr)

    console.log(info[question_num].correct_answer)
    option_a.innerHTML = shuffled_options[0]
    option_b.innerHTML = shuffled_options[1]
    option_c.innerHTML = shuffled_options[2]
    option_d.innerHTML = shuffled_options[3]
    question_num += 1
    submit_button.setAttribute("disabled", true)
    for (var i = 0; i < 4; i++)
        input[i].checked = false;
}


function submit() {
    if (question_num != 0 && info[question_num - 1].correct_answer == shuffled_options[answer]) {
        console.log("Viola")
        quiz_score += 1
        display_score.innerHTML=`Score: ${quiz_score}`
    }

    if (question_num >= 10) {
        question_num = 0
        getNewQuestions(api_url)
        // quiz_container.innerHTML = `Your score is ${quiz_score}`
        dis_score=document.createElement("div")
        dis_score.innerHTML=`Your score is ${quiz_score}`
        container.appendChild(dis_score)
        dis_score.className="yourscore"
        quiz_container.setAttribute("style","display:none;")

        reset_button_new=document.createElement("button")
        reset_button_new.setAttribute("id","rbutton")
        reset_button_new.innerHTML="reset"
        container.appendChild(reset_button_new)
        reset_button_new.addEventListener("click",event =>{
            reset_button_new.remove()
            dis_score.remove()
            reset()
        })
        // quiz_container.setAttribute("style", "align-items:center;")

    }
    update_questions()

}

async function getNewQuestions(api_url) {
    try {
        await fetch(api_url)
            .then((response) => response.json())
            .then((data) => {
                info = data.results
                return 0
            })
    } catch (e) {
        console.log(e)
    }
}

function shuffleOption(arr) {
    let out = []
    for (let i = 4; i >= 1; i--) {
        let ind = Math.ceil(Math.random() * i - 1)
        out.push(arr[ind])
        arr.splice(ind, 1)

    }
    return out
}


function enable() {
    submit_button.removeAttribute("disabled")
    let index = parseInt(this.value)
    answer = index
}


function startNewRound() {
    question_num = 0
    quiz_score = 0
    display_score.innerHTML=`Score: ${quiz_score}`
    getNewQuestions(api_url)
    setTimeout(function () {
        submit()
        quiz_container.className="in"
        quiz_container.setAttribute("style", "display:flex;")
    }, 2000)
}
let j = 0
for (let i = 0; i < 4; i++) {
    input[i].addEventListener("change", enable)
}

submit_button.addEventListener("click", submit)

function reset() {
    quiz_container.setAttribute("class","out")
    startNewRound()
}


reset_button.addEventListener("click", reset)

startNewRound()
