let questions = [];
let currentIndex = 0;
let score = 0;
let currentAnswer = "";

let startFlag = 0;

async function loadQuestion() {
  const res = await fetch("/api/start");
  const data = await res.json();
  questions = data.questions;

  const q = questions[0];
  console.log(questions);

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
    score++;
    document.getElementById("result").innerText = "正解！";
  } else {
    document.getElementById("result").innerText = "不正解: " + currentAnswer;
  }
  document.getElementById("correctCount").innerText = score;
  nextQuestion();
}

document.getElementById("ansButton").addEventListener("click", submitAnswer);

function showResult() {
  if (score === questions.length) {
    document.getElementById("result").innerText = "全問正解！おめでとう！";
  } else {
    document.getElementById("question").innerText =
      `終了！ ${score} / ${questions.length}`;
  }
  document.getElementById("questionButton").innerText = "もう一回";
  // リセット用の関数を別途作成予定
  currentIndex = 0;
  score = 0;
  startFlag = 0;
}
