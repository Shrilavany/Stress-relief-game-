let cycleCount = 0; // Counter to track the number of completed cycles
const maxCycles = 3; // Number of cycles before transitioning to the feedback message

// Function to speak a text message
function speak(message) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.rate = 1; // Adjust speaking rate if needed
  utterance.onend = () => {
    console.log("Finished speaking:", message);
    // Check if it's time to start the next cycle
    if (message === "Breathe out") {
      setTimeout(
        startBreathingExercise,
        parseInt(document.getElementById("exhale-duration").value, 10) * 1000
      );
    }
  };

  utterance.onerror = (event) => console.error("Speech error:", event);
  synth.speak(utterance);
}

// Function to handle breathing visualization
function visualizeBreathing(type) {
  const visualization = document.getElementById("visualization");
  const glassEffect = document.querySelector(".glass-effect");

  if (type === "inhale") {
    visualization.style.backgroundColor = "rgba(0, 255, 0, 0.2)"; // Light green
    glassEffect.style.background =
      "radial-gradient(circle, rgba(0, 255, 0, 0.3) 0%, rgba(0, 255, 0, 0) 70%)";
    visualization.style.transform = "scale(1.1)"; // Example scale effect
  } else if (type === "exhale") {
    visualization.style.backgroundColor = "rgba(255, 0, 0, 0.2)"; // Light red
    glassEffect.style.background =
      "radial-gradient(circle, rgba(255, 0, 0, 0.3) 0%, rgba(255, 0, 0, 0) 70%)";
    visualization.style.transform = "scale(1)"; // Reset scale
  }
}

// Function to start the breathing exercise
function startBreathingExercise() {
  const inhaleDuration =
    parseInt(document.getElementById("inhale-duration").value, 10) * 1000;
  const exhaleDuration =
    parseInt(document.getElementById("exhale-duration").value, 10) * 1000;

  if (cycleCount >= maxCycles) {
    // Transition to the feedback message after completing maxCycles
    document.getElementById("feedback").textContent =
      "Well done! You have completed the breathing exercise.";
    document.getElementById("feedback").classList.remove("hidden");
    return;
  }

  // Initial instructions
  document.getElementById("instructions").textContent = "Prepare to breathe...";
  speak("Prepare to breathe...");

  setTimeout(() => {
    // Breathe in instruction
    document.getElementById("instructions").textContent = "Breathe in...";
    speak("Breathe in");
    visualizeBreathing("inhale");

    setTimeout(() => {
      // Breathe out instruction
      document.getElementById("instructions").textContent = "Breathe out...";
      speak("Breathe out");
      visualizeBreathing("exhale");

      cycleCount++;
    }, inhaleDuration);
  }, 1000); // Initial delay before starting
}

// Automatically start the breathing exercise when the page loads
window.onload = () => {
  document.getElementById("settings").classList.add("hidden"); // Hide settings initially
  startBreathingExercise();
};
