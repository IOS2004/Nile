function addItem(parent, name, path, price, page) {
  let item = document.createElement('div');
  item.classList.add('item-card');
  item.innerHTML = '<img src="' + path + '" alt="' + name + '"> ' + name + '<div> &#8377; ' + price + '.00</div> <a href="' + page + '"> shop now &#8594; </a>';
  parent.appendChild(item);
}
let favs = document.querySelector('#similar');

function createProductPage() {
  return '#';
}

function getRandom(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}


for (let i = 0; i < 6; i++) {
  addItem(favs, "best selling headphone " + i, "../images/bestselling/" + i + ".jpg", getRandom(1000, 15000), createProductPage());
}

let image = document.querySelector('.item-showcase');

function update_data(product) {
  image.innerHTML = '<img src="' + '../' + product.path + '" alt="' + product.name + '">';
  document.querySelector('#iname').innerHTML = product.name;
  document.querySelector('#iprice').innerHTML = '&#8377; ' + product.price
  document.querySelector('#istatus').innerHTML = '<h3>Product Info</h3>' + product.details;
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
  console.log(storedUserData);
  console.log(productId)
  if (storedUserData != null) {
    const index = storedUserData.cart.findIndex(item => {return Number(item.id) === Number(productId)});

    if (index !== -1) {
      storedUserData.cart[index].frequency++;
    }
    else {
      const newItem = { id: productId, frequency: 1 };
      storedUserData.cart.push(newItem);
    }
    console.log('Updated cart:', storedUserData.cart);
    localStorage.setItem('UserData', JSON.stringify(storedUserData));
    console.log(storedUserData)

    fetch('/nile/update-cart', {
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
        console.log('Cart updated successfully:', data);
      })
      .catch(error => console.error('Error updating cart:', error));
  }
  else {
    console.error('Please login');
  }
})

