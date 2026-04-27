let questions = [];
let currentIndex = 0;
let score = 0;
let currentAnswer = "";

async function loadQuestion() {
  const res = await fetch("/api/start");
  const data = await res.json();
  questions = data.questions;

  const q = questions[0];

  currentAnswer = q.answer;

  document.getElementById("questionButton").innerText = "次の問題";
  document.getElementById("question").innerText = q.question;
}

function showQuestion() {
  const q = questions[currentIndex];
  currentAnswer = q.answer;

  document.getElementById("question").innerText = q.question;
  document.getElementById("answer").value = "";
  document.getElementById("result").innerText = "";
}

function nextQuestion() {
  currentIndex++;

  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

document.getElementById("questionButton").addEventListener("click", () => {
  if (document.getElementById("questionButton").innerText === "スタート") {
    loadQuestion();
  } else {
    nextQuestion();
  }
});

function submitAnswer() {
  const input = document.getElementById("answer").value;

  if (input.toUpperCase() === currentAnswer) {
    score++;
    document.getElementById("result").innerText = "正解！";
  } else {
    document.getElementById("result").innerText = "不正解: " + currentAnswer;
  }
  document.getElementById("correctCount").innerText = score;
}

document.getElementById("ansButton").addEventListener("click", submitAnswer);

function showResult() {
  document.getElementById("question").innerText =
    `終了！ ${score} / ${questions.length}`;
}
