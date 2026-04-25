let currentAnswer = "";

async function loadQuestion() {
  const res = await fetch("/api/start");
  const data = await res.json();

  const q = data.questions[0];

  currentAnswer = q.answer;

  document.getElementById("questionButton").innerText = "次の問題";
  document.getElementById("question").innerText = q.question;
}

function submitAnswer() {
  const input = document.getElementById("answer").value;

  if (input.toUpperCase() === currentAnswer) {
    document.getElementById("result").innerText = "正解！";
  } else {
    document.getElementById("result").innerText = "不正解: " + currentAnswer;
  }
}
