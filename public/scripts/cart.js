let login_btn = document.querySelector("#login-btn");
localStorage.setItem('islogged', 'f');
function updateLoginStatus(str, isLogin) {
  // handle status
  if (isLogin) {
    login_btn.href = "profile.html";
    login_btn.innerHTML = 'Profile';
    localStorage.setItem('islogged', 't');
  }
  else {
    login_btn.href = "/nile/login";
    login_btn.innerHTML = 'Login';
    localStorage.setItem('islogged', 'f');
  }
}
function setItems(total, cart, products){
  console.log(cart)
  console.log(products);
  console.log(total)
}

fetch('/nile/auth-status')
  .then(response => response.json())
  .then(data => {
    // localStorage.setItem('UserData', JSON.stringify(data));
    if (data) {

      const name = data.username;
      let tot = calculateTotalFrequency(data.cart)
      updateLoginStatus(name, true);
      fetch('/nile/cart/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cart: data.cart })
      })
      .then(response => response.json())
      .then(submitResponse => {
        console.log('Cart submitted successfully:', submitResponse);
        setItems(tot, data.cart, submitResponse);
      })
      .catch(error => {
        console.error('Error submitting cart:', error);
      });


    } else {
      updateLoginStatus("Not logged in", false);
    }

  })
  .catch(error => {
    console.log(error);
  });

function calculateTotalFrequency(cart) {
  if (!Array.isArray(cart) || cart.length === 0) {
    document.getElementById("nums").textContent = "0";
    return 0
  }
  let total = cart.reduce((total, item) => {

    return total + (item.frequency || 0);
  }, 0);
  document.getElementById("nums").textContent = `${total}`
  return total
}


