const start_btn = document.querySelector(".start_btn span");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const timer_sec = document.querySelector(".timer_sec")
const muzik = document.querySelector(".muzik")

start_btn.onclick = () => {
    quiz_box.classList.add("activeQuiz");
    showQuetions(0);
    queCounter(1);
}

let say = 0;
let timeValue = 5;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;



const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");


restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    timeValue = 15;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    next_btn.classList.remove("show");
}

quit_quiz.onclick = () => {
    window.location.reload();
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

function gizle(){
    let wrong = document.getElementById('wrong');
    wrong.style.display = "none";
    let gosterr = document.querySelector('.ipucusakla');
    gosterr.style.display="none";
}


next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuetions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        clearInterval(counterLine);
        timeText.textContent = "Zaman";
        next_btn.classList.remove("show");
        gizle();
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
}

function showQuetions(index) {
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option" ><span>' + questions[index].options[0] + '</span></div>'
        + '<div class="option" ><span>' + questions[index].options[1] + '</span></div>'
        + '<div class="option" ><span>' + questions[index].options[2] + '</span></div>'
        + '<div class="option" ><span>' + questions[index].options[3] + '</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");

    for (i = 0; i < option.length; i++) {

        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function yaz() {
    let wrong = document.getElementById('wrong');
    wrong.style.display = "block";

    let gosterr = document.querySelector('.ipucusakla');
    gosterr.style.display="block";

    const option = option_list.querySelectorAll(".option");
    for (i = 0; i < option.length; i++) {
        option[i].style.pointerEvents="none";
    }
}

function ShowTime() {
    yaz();
    startTimer(timeValue);
    /*startTimerLine(widthValue);*/
    timeText.textContent = "Lütfen Bekleyiniz";
}

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correcAns = questions[que_count].answer;
    if (userAns == correcAns) {
        userScore += 20;
        console.log(userScore)
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag);
        next_btn.classList.add("show");
    } else {
        userScore -=5
        console.log(userScore);
        yanlisSay();
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIconTag);
        ShowTime();
    }
}

function yanlisSay(){
    say +=1;
    console.log("yanlıs",say);
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 3) {
            timeCount.style.backgroundColor = "red";
        }
        if (time < 0) {
            timeCount.style.backgroundColor = "black";
            clearInterval(counter);
            timeText.textContent = "Tekrardan Seçebilirsiniz";
            let wrong = document.getElementById('wrong');
            wrong.style.display = "none";

            let tooltip = document.querySelector('.ipucusakla');
            tooltip.style.display = "none";

            const option = option_list.querySelectorAll(".option");
            for (i = 0; i < option.length; i++) {
                option[i].style.pointerEvents="auto";
            }
        }
    }
}

/*function startTimerLine(time) {
    counterLine = setInterval(timer, 15);

    function timer() {
        time += 1;
        time_line.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine);
        }
    }
}*/

function queCounter(index) {
    let totalQueCounTag = '<span><p>' + index + '</p> / <p>' + questions.length + '</p></span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;
}
function showResult(){
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 80) {
        let scoreTag = '<span>Tebrik ederim! 🎉,<p>' + userScore + '</p> puan aldınız. <p>' + '</p></span>';
        scoreText.innerHTML = scoreTag;
        play();
        start();
        stop();
    }
    else if(userScore > 50){
        let scoreTag = '<span>Süpersin 😍<p>'+ userScore +'</p> puan aldınız. <p>'+'</p></span>';
        scoreText.innerHTML = scoreTag;
        play();
        start();
        stop();
    }
    else{
        let scoreTag = '<span>Üzgünüm 😥,<p>'+ userScore +'</p> puan aldınız. <p>'+'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function myFunction() {
    var x = document.getElementById("myDIV");
    if (x.innerHTML === "ipucunu görmek ister misiniz?") {
        x.innerHTML = "Ben ipucuyum";
    }
}

function play() {
    var audio = new Audio('music.mp3');
    audio.play();
}