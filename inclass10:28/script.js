// Button color change when clicked
const colorButton = document.getElementById("colorButton");
colorButton.addEventListener("click", () => {
  const colors = ["#98fb98", "#ffb6c1", "#90ee90", "#ff69b4"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  colorButton.style.backgroundColor = colors[randomIndex];
});

// Function to check input and show alert
function checkInput() {
  const nameInput = document.getElementById("nameInput").value;

  if (nameInput === "") {
    alert("Please enter your name before submitting!");
  } else {
    let letters = "";
    for (let i = 0; i < nameInput.length; i++) {
      letters += nameInput[i] + " ";
    }
    alert("Hello " + nameInput + "! Your name has these letters: " + letters);
  }
}
