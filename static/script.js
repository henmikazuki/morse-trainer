let gameState = {
  score: 0,
  currentIndex: 0,
  questions: [],
};

let currentAnswer = "";

let startFlag = 0;

let totalCount = 0;

// TODO: 既知の不具合。もう1度スタートするときに、正解数が持ち越されて表示されている。リセットできるように変更予定
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

function resetGame() {
  gameState.currentIndex = 0;
  gameState.score = 0;
  startFlag = 0;
  document.querySelector(".question_count_container").style.display = "none";
  document.getElementById("correctCount").innerText = "0";
  document.getElementById("question").innerText = "";
  document.getElementById("result").innerText = "";
  // document.getElementById("questionCount").innerText = "0";

  restertGame();
}

function restertGame() {
  document.getElementById("questionButton").onclick = setPlayingMode;

  document.getElementById("questionButton").style.display = "block";
  document.getElementById("questionButton").innerText = "スタート";
}

function setPlayingMode() {
  if (startFlag === 0) {
    loadQuestion();
    startFlag = 1;
  } else {
    nextQuestion();
  }
}

function setResultMode() {
  document.getElementById("ansButton").addEventListener("click", submitAnswer);

  document.getElementById("answer").addEventListener("keydown", (e) => {
    if (
      e.key === "Enter" &&
      document.getElementById("answer").value.trim() !== ""
    )
      submitAnswer();
  });
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

// TODO: もう一回ボタン押下時は、そのままスタートせずに最初の画面に戻るように変更予定
function showResult() {
  document.querySelector(".question_set").style.display = "none";

  if (gameState.score === gameState.questions.length) {
    document.getElementById("result").innerText = "全問正解！おめでとう！";
  } else {
    document.getElementById("question").innerText =
      `終了！ ${gameState.score} / ${gameState.questions.length}`;
  }

  document.getElementById("questionButton").onclick = resetGame;

  document.getElementById("questionButton").style.display = "block";
  document.getElementById("questionButton").innerText = "もう一回";
}
