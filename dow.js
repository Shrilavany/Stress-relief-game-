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

  // Download HTML file
  document
    .getElementById("download-html-button")
    .addEventListener("click", function () {
      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Stress Relief Game Results</title>
    <link rel="stylesheet" href="result.css" />
</head>
<body>
    <div class="container">
        <h1>Stress Relief Game Results</h1>
        <div class="chart-container">
            <div class="bar-container">
                <div id="total-bar" class="bar total-bar"></div>
                <div id="your-bar" class="bar your-bar"></div>
            </div>
            <div id="marks-text" class="marks-text">Your marks: ${userMarks}</div>
        </div>
        <button id="play-again">Get Your Thinking Into a New One</button>
        <div id="video-container" class="video-container">
            <video id="motivational-video" width="640" height="360" controls>
                <source src="in-y2mate.com - The Most Inspiring Speech 4 True Rules To Success  A P J Abdul Kalam_1080p.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
        <button id="home-button" onclick="window.location.href='in1.html'">Home</button>
    </div>
    <script src="result.js"></script>
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "result.html"; // Specify the .html extension here
      a.click();
      URL.revokeObjectURL(url);
    });

  // Download PDF file
  document
    .getElementById("download-pdf-button")
    .addEventListener("click", function () {
      const { jsPDF } = window.jspdf;

      html2canvas(document.querySelector(".container")).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("result.pdf");
      });
    });

  // Download Word document
  document
    .getElementById("download-docx-button")
    .addEventListener("click", function () {
      const { Document, Packer, Paragraph, TextRun } = docx;

      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                children: [
                  new TextRun("Stress Relief Game Results"),
                  new TextRun({
                    text: `Your marks: ${userMarks}`,
                    bold: true,
                  }),
                  new TextRun(
                    "\n\nThank you for participating in the stress relief game. We hope this helps you manage your stress and achieve a balanced mindset."
                  ),
                ],
              }),
            ],
          },
        ],
      });

      Packer.toBlob(doc).then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "result.docx"; // Specify the .docx extension here
        a.click();
        URL.revokeObjectURL(url);
      });
    });

  // Download Image file
  document
    .getElementById("download-image-button")
    .addEventListener("click", function () {
      html2canvas(document.querySelector(".container")).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "result.jpg"; // Specify the .jpg extension here
        link.click();
      });
    });
});
