async function loadQuestion() {
  const res = await fetch("/api/start");
  const data = await res.json();

  document.getElementById("question").innerText = data.questions[0].question;
}
