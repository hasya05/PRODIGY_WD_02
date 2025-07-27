let [hours, minutes, seconds] = [0, 0, 0];
let timer = null;

const display = document.getElementById("display");
const laps = document.getElementById("laps");
const sessionNameInput = document.getElementById("sessionName");

function updateDisplay() {
  const h = hours.toString().padStart(2, '0');
  const m = minutes.toString().padStart(2, '0');
  const s = seconds.toString().padStart(2, '0');
  display.textContent = `${h}:${m}:${s}`;
}

function stopwatch() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }
  updateDisplay();
}

document.getElementById("start").onclick = () => {
  if (timer) clearInterval(timer);
  timer = setInterval(stopwatch, 1000);
};

document.getElementById("pause").onclick = () => {
  clearInterval(timer);
};

document.getElementById("reset").onclick = () => {
  clearInterval(timer);
  [hours, minutes, seconds] = [0, 0, 0];
  updateDisplay();
  laps.innerHTML = '';
  localStorage.removeItem("lapData");
};

document.getElementById("lap").onclick = () => {
  const time = display.textContent;
  const note = prompt("Note for this lap? (optional):");
  const session = sessionNameInput.value || "Unnamed Session";
  const lapText = `${session} - ${time}${note ? ` → ${note}` : ""}`;

  const li = document.createElement("li");
  li.textContent = lapText;
  laps.appendChild(li);

  // Save to localStorage
  saveLapToStorage(lapText);
};

document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

function saveLapToStorage(lap) {
  const existing = JSON.parse(localStorage.getItem("lapData")) || [];
  existing.push(lap);
  localStorage.setItem("lapData", JSON.stringify(existing));
}

function loadLaps() {
  const data = JSON.parse(localStorage.getItem("lapData")) || [];
  data.forEach(lap => {
    const li = document.createElement("li");
    li.textContent = lap;
    laps.appendChild(li);
  });
}

// Init
updateDisplay();
loadLaps();
function showRandomQuote() {
  const quotes = [
    "You’re doing better than you think ✨",
    "Small progress is still progress 🌱",
    "Keep going, you're almost there 💪",
    "Trust the timing of your life ⏳",
    "Consistency is the key 🗝️",
    "Progress, not perfection 🌷",
    "You are your only limit 🚀",
    "Every second counts ⏱️",
    "Your future self will thank you 💖",
    "Dream big. Start small. Act now. 🌟"
  ];

  const random = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quote").textContent = random;
}

showRandomQuote();
