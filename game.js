document.addEventListener("DOMContentLoaded", function () {
  // Define all 20 questions
  const questions = [
    {
      text: "How do you manage stress in high-pressure situations?",
      options: [
        "Take deep breaths and stay calm",
        "Delegate tasks to others",
        "Prioritize and plan my tasks",
        "Seek support from colleagues",
        "Take a break and relax",
      ],
    },
    {
      text: "What relaxation techniques do you find most effective?",
      options: [
        "Meditation and mindfulness",
        "Exercise and physical activity",
        "Listening to soothing music",
        "Reading or watching a movie",
        "Spending time with family and friends",
      ],
    },
    {
      text: "How do you handle unexpected challenges at work?",
      options: [
        "Stay flexible and adapt quickly",
        "Seek advice from a mentor",
        "Break down the problem into smaller parts",
        "Stay positive and keep moving forward",
        "Take a step back and reassess the situation",
      ],
    },
    {
      text: "What are your favorite methods to unwind after a stressful day?",
      options: [
        "Engage in a hobby or leisure activity",
        "Spend time in nature",
        "Practice yoga or relaxation exercises",
        "Cook or bake something I enjoy",
        "Socialize with friends and family",
      ],
    },
    {
      text: "How do you prioritize your tasks to manage stress effectively?",
      options: [
        "Create a to-do list and follow it",
        "Focus on high-priority tasks first",
        "Break tasks into manageable steps",
        "Delegate tasks to others when possible",
        "Set realistic deadlines and goals",
      ],
    },
    // Add the remaining 15 questions
    {
      text: "What role does exercise play in your stress management?",
      options: [
        "It helps clear my mind",
        "It improves my mood",
        "It provides a physical outlet for stress",
        "It helps me stay disciplined",
        "I don't exercise regularly",
      ],
    },
    {
      text: "How often do you practice mindfulness or meditation?",
      options: [
        "Daily",
        "Several times a week",
        "Occasionally",
        "Rarely",
        "Never",
      ],
    },
    {
      text: "What is your preferred method for handling work deadlines?",
      options: [
        "Plan ahead and start early",
        "Work under pressure",
        "Delegate tasks",
        "Work late to meet deadlines",
        "Ask for extensions",
      ],
    },
    {
      text: "Which of these is most likely to help you relax?",
      options: [
        "Listening to music",
        "Reading a book",
        "Taking a walk",
        "Watching TV",
        "Spending time alone",
      ],
    },
    {
      text: "How do you approach problem-solving under stress?",
      options: [
        "Break the problem into smaller tasks",
        "Consult with others",
        "Use past experiences to guide me",
        "Take a break and return later",
        "Address it as soon as it arises",
      ],
    },
    // Continue to add all 20 questions
  ];

  const numQuestions = 5;
  let currentQuestions = [];
  let currentQuestionIndex = 0;
  let score = 0;
  const questionWeight = [5, 4, 3, 2, 1]; // Scores for each choice
  const userSelections = {}; // Track user selections

  // Initialize SpeechSynthesis
  const synth = window.speechSynthesis;

  function getRandomQuestions() {
    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numQuestions);
  }

  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // Set the language for the speech synthesis
    synth.speak(utterance);
  }

  function displayQuestion(index) {
    if (index >= currentQuestions.length) {
      showResult();
      return;
    }

    const question = currentQuestions[index];
    document.getElementById("question").textContent = question.text;

    // Read the question aloud
    speak(question.text);

    document
      .querySelectorAll(".choice-container")
      .forEach((choice, choiceIndex) => {
        choice.querySelector(".choice-text").textContent =
          question.options[choiceIndex];
        choice
          .querySelector(".choice-text")
          .setAttribute("data-number", choiceIndex + 1);

        // Clear previous selection style
        choice.classList.remove("selected");

        // Restore the previous selection if exists
        if (userSelections[index] === choiceIndex + 1) {
          choice.classList.add("selected");
        }
      });

    document.getElementById("next").style.display =
      index < currentQuestions.length - 1 ? "block" : "none";
    document.getElementById("submit-btn").style.display =
      index === currentQuestions.length - 1 ? "block" : "none";
    document.getElementById("back").style.display =
      index > 0 ? "block" : "none";
    updateProgressBar();
  }

  function handleChoiceSelection() {
    document
      .querySelectorAll(".choice-container")
      .forEach((c) => c.classList.remove("selected"));
    this.classList.add("selected");
  }

  function handleNext() {
    const selectedChoice = document.querySelector(
      ".choice-container.selected .choice-text"
    );
    if (!selectedChoice) {
      alert("Please select an answer before proceeding.");
      return;
    }

    // Save the selection for the current question
    userSelections[currentQuestionIndex] = parseInt(
      selectedChoice.getAttribute("data-number")
    );

    // Update the score
    score += questionWeight[userSelections[currentQuestionIndex] - 1];

    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
  }

  function handleBack() {
    if (currentQuestionIndex > 0) {
      // Subtract the score for the previous choice
      const previousChoice = document.querySelector(
        ".choice-container.selected .choice-text"
      );
      if (previousChoice) {
        score -=
          questionWeight[
            parseInt(previousChoice.getAttribute("data-number")) - 1
          ];
      }

      // Remove the saved selection for the current question
      delete userSelections[currentQuestionIndex];

      currentQuestionIndex--;
      displayQuestion(currentQuestionIndex);
    }
  }

  function showResult() {
    let resultText = "";
    if (score >= 21 && score <= 25) {
      resultText = "Excellent Stress Management 🌟";
    } else if (score >= 16 && score <= 20) {
      resultText = "Good Stress Management 😊";
    } else if (score >= 11 && score <= 15) {
      resultText = "Average Stress Management 🙂";
    } else if (score >= 6 && score <= 10) {
      resultText = "Needs Improvement 😕";
    } else {
      resultText = "Poor Stress Management 😔";
    }

    document.getElementById("game").style.display = "none";
    document.getElementById("result").style.display = "flex";
    document.getElementById("result-text").textContent =
      "Your stress management level:Loading!! ";
  }

  function resetGame() {
    document.getElementById("game").style.display = "flex";
    document.getElementById("result").style.display = "none";
    score = 0;
    currentQuestionIndex = 0;
    userSelections = {}; // Reset user selections
    currentQuestions = getRandomQuestions();
    displayQuestion(currentQuestionIndex);
  }

  function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / numQuestions) * 100;
    document.getElementById("progress").style.width = "${progress}%";
  }

  document.getElementById("play-again").addEventListener("click", resetGame);

  document.querySelectorAll(".choice-container").forEach((choice) => {
    choice.addEventListener("click", handleChoiceSelection);
  });

  document.getElementById("next").addEventListener("click", handleNext);
  document.getElementById("back").addEventListener("click", handleBack);

  // Initialize the game
  currentQuestions = getRandomQuestions();
  displayQuestion(currentQuestionIndex);
});
