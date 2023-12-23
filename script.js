let timers = [];

function startNewTimer() {
  const hours = parseInt(document.getElementById("hours").value) || 0;
  const minutes = parseInt(document.getElementById("minutes").value) || 0;
  const seconds = parseInt(document.getElementById("seconds").value) || 0;

  if (hours === 0 && minutes === 0 && seconds === 0) {
    alert("Please enter a valid time.");
    return;
  }

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  const timer = {
    id: Date.now(),
    timeRemaining: totalSeconds,
    intervalId: setInterval(() => {
      timer.timeRemaining--;
      updateTimerDisplay(timer);
      if (timer.timeRemaining === 0) {
        clearInterval(timer.intervalId);
        handleTimerEnd(timer);
      }
    }, 1000),
  };

  timers.push(timer);
  updateActiveTimersDisplay();
}

function updateTimerDisplay(timer) {
  // Display for the given timer
  const timerElement = document.getElementById(`timer-${timer.id}`);
  if (timerElement) {
    const hours = Math.floor(timer.timeRemaining / 3600);
    const minutes = Math.floor((timer.timeRemaining % 3600) / 60);
    const seconds = timer.timeRemaining % 60;
    timerElement.textContent = `${formatTime(hours)}:${formatTime(
      minutes
    )}:${formatTime(seconds)}`;
  }
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function updateActiveTimersDisplay() {
  // Display for all active timers
  const activeTimersContainer = document.getElementById("activeTimers");
  activeTimersContainer.innerHTML = "";

  timers.forEach((timer) => {
    const timerElement = document.createElement("div");
    timerElement.id = `timer-${timer.id}`;
    timerElement.textContent = formatTime(timer.timeRemaining);

    const stopButton = document.createElement("button");
    stopButton.textContent = "Stop Timer";
    stopButton.onclick = () => stopTimer(timer.id);

    timerElement.appendChild(stopButton);
    activeTimersContainer.appendChild(timerElement);
  });
}

function stopTimer(timerId) {
  const timerIndex = timers.findIndex((timer) => timer.id === timerId);
  if (timerIndex !== -1) {
    clearInterval(timers[timerIndex].intervalId);
    timers.splice(timerIndex, 1);
    updateActiveTimersDisplay();
  }
}

function handleTimerEnd(timer) {
  // Play audio when a timer ends
  const timerElement = document.getElementById(`timer-${timer.id}`);
  if (timerElement) {
    timerElement.classList.add("timer-ended");
    playAudioAlert();
  }
}

function playAudioAlert() {
  // This function to play an audio alert
  const audio = new Audio("second.mp3");
  audio.play();
}
