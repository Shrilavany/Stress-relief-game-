let player;

// Function to initialize the YouTube player
function onYouTubeIframeAPIReady() {
  player = new YT.Player("youtube-player", {
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

// Function to handle when the YouTube player is ready
function onPlayerReady(event) {
  // Do nothing here; the video will autoplay when the button is clicked
}

// Function to handle changes in the player state
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    player.playVideo(); // Loop the video
  }
}

// Function to speak a text message
function speak(message) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.rate = 1;
  synth.speak(utterance);
}

// Function to start the meditation
function startMeditation() {
  speak(
    "Close your eyes and meditate for one minute. Focus on your breathing and relax."
  );

  // Countdown timer
  let timeLeft = 60;
  const timerElement = document.getElementById("timer");

  const countdown = setInterval(() => {
    timerElement.textContent = timeLeft;
    timeLeft -= 1;
    if (timeLeft < 0) {
      clearInterval(countdown);
      timerElement.textContent = "Done!";
      speak("Meditation complete. Thank you for participating.");

      // Show the Next button
      document.getElementById("next").classList.remove("hidden");
    }
  }, 1000);

  // Start playing the music
  player.playVideo();
}

// Function to handle the Next button click
function handleNextButtonClick() {
  window.location.href = "indexfront.html"; // Replace 'nextpage.html' with the URL of your next page
}

// Add event listener to the start button
document
  .getElementById("start-meditation")
  .addEventListener("click", startMeditation);

// Add event listener to the Next button
document
  .getElementById("next")
  .addEventListener("click", handleNextButtonClick);

// Load the YouTube IFrame API script
const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
