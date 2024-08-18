/* populate scrollers */

let scroller = document.querySelector('#bestSelling');
let scroller2 = document.querySelector('#classic');
let scroller3 = document.querySelector('#featured');

function addItem(parent, name, path, price, page) {
  let item = document.createElement('div');
  item.classList.add('item-card');
  item.innerHTML = '<img src="' + path + '" alt="' + name + '"> ' + name + '<div> &#8377; ' + price + '.00</div> <a href="' + page + '"> shop now &#8594; </a>';
  parent.appendChild(item);
}

function createProductPage() {
  return '#';
}

function getRandom(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

for (let i = 0; i < 6; i++) {
  addItem(scroller, "best selling headphone " + i, "images/bestselling/" + i + ".jpg", getRandom(1000, 15000), createProductPage());
}

for (let i = 0; i < 6; i++) {
  addItem(scroller2, "classic headphone " + i, "images/classics/" + i + ".jpg", getRandom(1000, 15000), createProductPage());
}

for (let i = 0; i < 7; i++) {
  addItem(scroller3, "featured headphone " + i, "images/featured/" + i + ".jpg", getRandom(1000, 15000), createProductPage());
}



let login_btn = document.querySelector("#login-btn");
localStorage.setItem('islogged', 'f');
function updateLoginStatus(str, isLogin) {
  // handle status
  if (isLogin) {
    login_btn.href = "/pages/profile.html";
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


