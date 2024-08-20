// favourites scroller
function addItem(parent, name, path, price, page) {
  let item = document.createElement('div');
  item.classList.add('item-card');
  item.innerHTML = '<img src="' + path + '" alt="' + name + '"> ' + name + '<div> &#8377; ' + price + '</div> <a href="' + page + '"> shop now &#8594; </a>';
  parent.appendChild(item);
}
let favs = document.querySelector('#favourites');





let login_btn = document.querySelector("#login-btn");
localStorage.setItem('islogged', 'f');
function updateLoginStatus(str, isLogin) {
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
      setPage(data)
      const name = data.username;
      calculateTotalFrequency(data.cart)
      updateLoginStatus(name, true);
      fetch('/nile/fav/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ favourites: data.favourites })
      })
      .then(response => response.json())
      .then(submitResponse => {
        for (let i = 0; i < submitResponse.length; i++)
        {
          let favprod = submitResponse[i];
          addItem(favs, favprod.name, '../' + favprod.path, favprod.price, `product_page.html?id=${favprod.id}`);
        }
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
    return
  }
  let total = cart.reduce((total, item) => {

    return total + (item.frequency || 0);
  }, 0);
  document.getElementById("nums").textContent = `${total}`
}




function getRandom(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

function setPage(user) {
  const username = user.username;
  const email = user.email;
  let pfpimage = document.querySelector('#pimg');
  pfpimage.innerHTML = '<img src="../images/profile_images/' + getRandom(0, 5) + '.svg" alt="profile picture">';


  let pname = document.querySelector('#pname');
  pname.textContent = username.toUpperCase();
  let pemail = document.querySelector('#pemail');
  pemail.textContent = email;
}
// logout function 
let logOut = document.querySelector('#logout');
logOut.addEventListener('click', () => {
  fetch('/nile/logout', { method: 'POST' })
    .then(response => {
      if (response.ok) {
        window.location.href = '/nile';
      }
      else {
        console.error('Logout failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
