let startTime;
let elapsedTime = 0;
let timerInterval;
const timerDisplay = document.querySelector(".timer");
const lapsContainer = document.getElementById("laps");
const lapSound = document.getElementById("lapSound");

function timeToString(time) {
  const date = new Date(time);
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  const milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, "0");
  return `${minutes}:${seconds}:${milliseconds}`;
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    timerDisplay.textContent = timeToString(elapsedTime);
  }, 10);
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  timerDisplay.textContent = "00:00:00";
  lapsContainer.innerHTML = "";
}

function recordLap() {
  if (elapsedTime > 0) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = timeToString(elapsedTime);

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.onclick = () => li.remove();

    li.appendChild(span);
    li.appendChild(delBtn);
    lapsContainer.appendChild(li);

    // Play sound
    lapSound.play();
  }
}

function exportLaps() {
  const laps = document.querySelectorAll("#laps li span");
  if (laps.length === 0) return alert("No laps to export!");

  let csv = "Lap Time\n";
  laps.forEach((lap, index) => {
    csv += `Lap ${index + 1},${lap.textContent}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "laps.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function toggleTheme() {
  document.body.classList.toggle("light");
}

// Event Listeners
document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("lap").addEventListener("click", recordLap);
document.getElementById("export").addEventListener("click", exportLaps);
document.getElementById("themeToggle").addEventListener("click", toggleTheme);
