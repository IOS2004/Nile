let image = document.querySelector('.item-showcase');

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.innerHTML = message;
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 2000); // Hide after 2 seconds
}

function update_data(product) {
  image.innerHTML = '<img src="' + '../' + product.path + '" alt="' + product.name + '">';
  document.querySelector('#iname').innerHTML = product.name;
  document.querySelector('#iprice').innerHTML = '&#8377; ' + product.price
  document.querySelector('#istatus').innerHTML = '<h3>Product Info</h3>' + product.details;
  const storedUserData = JSON.parse(localStorage.getItem('UserData'));
  if (storedUserData != null) {

    const index = storedUserData.favourites.findIndex(item => {
      return Number(item.id) === Number(product.id);
    });
    if (index !== -1) {
      addToFav.style.backgroundColor = 'red';
    }
    else {
      addToFav.style.backgroundColor = 'black';
    }
  }
}
let productId;
function setId(id) {
  productId = id;
}
document.addEventListener("DOMContentLoaded", function () {

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  setId(id);
  fetch(`/nile/product/details?id=${id}`)
    .then(response => response.json())
    .then(data => {
      update_data(data);
    })
})
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
fetch('/nile/auth-status')
  .then(response => response.json())
  .then(data => {
    localStorage.setItem('UserData', JSON.stringify(data));
    if (data) {

      const name = data.username;
      calculateTotalFrequency(data.cart)
      updateLoginStatus(name, true);

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
    return
  }
  let total = cart.reduce((total, item) => {

    return total + (item.frequency || 0);
  }, 0);
  document.getElementById("nums").textContent = `${total}`
}

let addToCart = document.getElementById("icart");
addToCart.addEventListener('click', () => {
  if (localStorage.getItem('islogged') == 'f')
  {
    alert("Please Log in to add items to cart");
    return;
  }
  const storedUserData = JSON.parse(localStorage.getItem('UserData'));
  if (storedUserData != null) {
    const index = storedUserData.cart.findIndex(item => {return Number(item.id) === Number(productId)});

    if (index !== -1) {
      storedUserData.cart[index].frequency++;
    }
    else {
      const newItem = { id: productId, frequency: 1 };
      storedUserData.cart.push(newItem);
    }
    localStorage.setItem('UserData', JSON.stringify(storedUserData));
    showToast('&#10004; Item added successfully');

    fetch('/nile/update/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cart: storedUserData.cart,
        username: storedUserData.username
      })
    })
      .then(response => response.json())
      .then(data => {
        calculateTotalFrequency(storedUserData.cart)
      })
      .catch(error => console.error('Error updating cart:', error));
  }
  else {
    console.error('Please login');
  }
})
//productScript.js
let addToFav = document.getElementById("ifav");
addToFav.addEventListener('click', () => {
  const storedUserData = JSON.parse(localStorage.getItem('UserData'));
  if (storedUserData != null) {

    const index = storedUserData.favourites.findIndex(item => {
      return Number(item.id) === Number(productId);
    });
    if (index !== -1) {
      storedUserData.favourites.splice(index, 1); 
      addToFav.style.backgroundColor = 'black';
      showToast(' &#9825; Item removed from favourites');
    }
    else {
      const newItem = { id: productId, frequency: 1 };
      addToFav.style.backgroundColor = 'red';
      storedUserData.favourites.push(newItem);
      showToast('&#10084; Item added to favourites')
    }
    localStorage.setItem('UserData', JSON.stringify(storedUserData));

    fetch('/nile/update/fav', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        favourites: storedUserData.favourites,
        username: storedUserData.username
      })
    })
      .then(response => response.json())
      .then(data => {
      })
      .catch(error => console.error('Error updating fav:', error));
  }
  else {
    alert('Please login to add to favourite');
  }
})

