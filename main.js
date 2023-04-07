// Khai báo các biến:
const container = document.querySelector("main .container");
const again = document.querySelector(".again");
const inputAnswer = document.querySelector(".game-body__input");
const check = document.querySelector("#game-body form button");
const hint = document.querySelector(".game-body__details .hint");
const score = document.querySelector(".game-body__details .score");
const highScore = document.querySelector(".game-body__details .highscore");
const correctAnswer = document.querySelector("#correct-answer p");

let game = {
    correctAnswer: Math.floor(Math.random() * 19),
    gameScore: 20,
    gameHighScore: localStorage.getItem("highScore") || 0,

    renderHighScore: function () {
        highScore.innerText = `Highscore : ${this.gameHighScore}`;
    },

    newGame: function () {
        window.location.reload();
    },

    checkHighScore: function () {
        if (this.gameScore >= this.gameHighScore) {
            this.gameHighScore = this.gameScore;
            localStorage.setItem("highScore", this.gameHighScore);
            highScore.innerText = `Highscore : ${this.gameHighScore}`;
        }
    },

    // game play here:
    gamePlay: function () {
        let userAnswer;
        check.addEventListener("click", (event) => {
            event.preventDefault();
            //==== check the answer:
            userAnswer = Number(inputAnswer.value);
            console.log(userAnswer);
            // if equal:
            if (userAnswer === this.correctAnswer) {
                hint.innerText = "Correct!";
                correctAnswer.innerText = `${this.correctAnswer}`;
                this.checkHighScore();
                container.style.backgroundColor = "var(--correct-color)";
            } else if (userAnswer < this.correctAnswer) {
                hint.innerText = "Too Low!";
                this.gameScore--;
                score.innerText = `Score : ${this.gameScore}`;
            } else {
                hint.innerText = "Too High!";
                this.gameScore--;
                score.innerText = `Score : ${this.gameScore}`;
            }
        });
    },

    start: function () {
        this.gamePlay();
        this.renderHighScore();
    },
};

again.addEventListener("click", game.newGame);
game.start();
console.log(game);
