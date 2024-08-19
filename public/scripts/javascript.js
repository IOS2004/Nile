/* populate scrollers */

let scroller = document.querySelector('#bestSelling');
let scroller2 = document.querySelector('#classic');
let scroller3 = document.querySelector('#featured');

const headphones = [
  { name: "Eclipse X1", price: 1659.23 },
  { name: "Thunderbolt", price: 2489.59 },
  { name: "Mirage Pro", price: 3319.42 },
  { name: "Vortex", price: 4149.88 },
  { name: "Fusion", price: 4969.34 },
  { name: "Reverb", price: 5759.91 },
  { name: "Pulse Z1", price: 6589.47 },
  { name: "Nebula", price: 7419.29 },
  { name: "Zenith", price: 8249.83 },
  { name: "Echo Pro", price: 9079.56 },
  { name: "Waveform", price: 9909.72 },
  { name: "Stratos", price: 10739.38 },
  { name: "Infinity", price: 11569.51 },
  { name: "Nimbus", price: 12399.28 },
  { name: "Aether", price: 13229.76 },
  { name: "Quasar", price: 14059.64 },
  { name: "Nova", price: 14889.82 },
  { name: "Lumina", price: 15719.45 },
  { name: "Stellar", price: 16549.33 }
];

function addItem(parent, name, path, price, page) {
  let item = document.createElement('div');
  item.classList.add('item-card');
  item.innerHTML = '<img src="' + path + '" alt="' + name + '"> ' + name + '<div> &#8377; ' + price + '</div> <a href="' + page + '"> shop now &#8594; </a>';
  parent.appendChild(item);
}

function createProductPage(id) {
  return `pages/product_page.html?id=${id + 1}`;
}

function getRandom(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

for (let i = 0; i < 6; i++) {
  addItem(scroller, headphones[i].name, "images/overEar/" + i + ".jpg", headphones[i].price, createProductPage(i));
}

for (let i = 6; i < 12; i++) {
  addItem(scroller2, headphones[i].name, "images/overEar/" + i + ".jpg", headphones[i].price, createProductPage(i));
}

for (let i = 12; i < 19; i++) {
  addItem(scroller3, headphones[i].name, "images/overEar/" + i + ".jpg", headphones[i].price, createProductPage(i));
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


