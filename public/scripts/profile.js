fetch('/nile/auth-status')
  .then(response => response.json())
  .then(data => {
    handleData(data); // Call the function that uses the fetched data
  })
  .catch(error => {
    console.log(error);
});

  
let display = document.querySelector('.data');

function handleData(data) {
  const username = data.username;
  const email = data.email;
  display.textContent = "User: " + username + " Email: " + email;
}