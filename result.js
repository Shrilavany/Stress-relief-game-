document.addEventListener("DOMContentLoaded", function () {
  // Initialize marks
  const totalMarks = 25; // Total marks possible
  const userMarks = Math.floor(Math.random() * 5) + 21; // Randomize between 21 and 25

  // Select elements
  const totalBar = document.getElementById("total-bar");
  const yourBar = document.getElementById("your-bar");
  const marksText = document.getElementById("marks-text");
  const videoContainer = document.getElementById("video-container");
  const motivationalVideo = document.getElementById("motivational-video");
  const playAgainButton = document.getElementById("play-again");

  // Initialize SpeechSynthesis
  const synth = window.speechSynthesis;

  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // Set the language for the speech synthesis
    synth.speak(utterance);
  }

  // Initialize bars
  totalBar.style.width = "100%";
  yourBar.style.width = "0%";

  // Animate bars
  setTimeout(() => {
    yourBar.style.width = `${(userMarks / totalMarks) * 100}%`;
  }, 500); // Delay for animation effect

  // Display user marks after animation
  setTimeout(() => {
    marksText.textContent = `Your marks: ${userMarks}`;
    // Speak the motivational message
    speak(
      "Congratulations on Completing the Stress Relief Game! You've made it to the end, and that’s a remarkable achievement. Life, especially in the IT field, can be demanding and stressful. But today, you've taken a significant step towards managing that stress and embracing a healthier, more balanced mindset."
    );
  }, 2500); // Adjust timing as needed

  // Show motivational video on button click
  playAgainButton.addEventListener("click", function () {
    motivationalVideo.src =
      "in-y2mate.com - The Most Inspiring Speech 4 True Rules To Success  A P J Abdul Kalam_1080p.mp4"; // Updated to use local MP4 file

    videoContainer.style.display = "block";
  });
});
