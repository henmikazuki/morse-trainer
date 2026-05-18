let gameState = {
  score: 0,
  currentIndex: 0,
  questions: [],
};

let currentAnswer = "";

let startFlag = 0;

let totalCount = 0;
let questionCount = 0;

async function loadQuestion() {
  const res = await fetch("/api/start");
  const data = await res.json();
  gameState.questions = data.questions;
  totalCount = gameState.questions.length;

  const q = gameState.questions[0];
  // TODO: デバッグ用。削除予定
  console.log(gameState.questions);

  currentAnswer = q.answer;

  document.querySelector(".question_count_container").style.display = "block";
  document.querySelector(".question_set").style.display = "block";
  document.getElementById("questionButton").style.display = "none";
  document.getElementById("question").innerText = q.question;
  document.getElementById("questionCount").innerText =
    gameState.currentIndex + 1;
  document.getElementById("totalCount").innerText = totalCount;
}

function showQuestion() {
  const q = gameState.questions[gameState.currentIndex];
  currentAnswer = q.answer;

  document.getElementById("question").innerText = q.question;
}

function nextQuestion() {
  gameState.currentIndex++;

  if (gameState.currentIndex < gameState.questions.length) {
    document.getElementById("questionCount").innerText =
      gameState.currentIndex + 1;
    showQuestion();
  } else {
    showResult();
  }
}

document.getElementById("questionButton").addEventListener("click", () => {
  if (startFlag === 0) {
    loadQuestion();
    startFlag = 1;
  } else {
    nextQuestion();
  }
});

function submitAnswer() {
  const input = document.getElementById("answer").value;

  if (input.toUpperCase() === currentAnswer) {
    gameState.score++;
    document.getElementById("result").style.color = "green";
    document.getElementById("result").innerText = "正解！";
  } else {
    document.getElementById("result").style.color = "red";
    document.getElementById("result").innerText = "不正解: " + currentAnswer;
  }
  document.getElementById("correctCount").innerText = gameState.score;
  document.getElementById("answer").value = "";
  nextQuestion();
}

document.getElementById("ansButton").addEventListener("click", submitAnswer);

document.getElementById("answer").addEventListener("keydown", (e) => {
  if (
    e.key === "Enter" &&
    document.getElementById("answer").value.trim() !== ""
  )
    submitAnswer();
});

function showResult() {
  document.querySelector(".question_set").style.display = "none";

  if (gameState.score === gameState.questions.length) {
    document.getElementById("result").innerText = "全問正解！おめでとう！";
  } else {
    document.getElementById("question").innerText =
      `終了！ ${gameState.score} / ${gameState.questions.length}`;
  }
  document.getElementById("questionButton").style.display = "block";
  document.getElementById("questionButton").innerText = "もう一回";
  // リセット用の関数を別途作成予定
  currentIndex = 0;
  score = 0;
  startFlag = 0;
  questionCount = 0;
}
