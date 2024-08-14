// script2.js

document.addEventListener('DOMContentLoaded', () => {
  // Use a timeout or check for the data explicitly if needed
  setTimeout(() => {
    if (window.UserData) {
      console.log(window.UserData); // Access the UserData here
    } else {
      console.log("UserData not available yet");
    }
  }, 100); // Delay for demonstration; adjust as needed
});
