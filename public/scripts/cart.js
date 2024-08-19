// add Items of cart to display

let cartSection = document.querySelector('.addedItems');
let summary = document.querySelector('.total');

function findCategory(parsepath) {
  let cat = '';
  for (let i = 7; i < parsepath.length; i++)
  {
    if (parsepath[i] == '/')
      break;
    cat += parsepath[i];
  } 
  if (cat == 'overEar')
    return 'Over Ear Headphone';
  if (cat == 'inEar')
    return 'In Ear Monitor';
  if (cat == 'earBuds')
    return 'Ear Buds';
}

function displayCard(product, frequency)
{
  let cat = findCategory(product.path)
  let elecard = document.createElement('div');
  elecard.classList.add('cart-card');
  let eleimage = document.createElement('div');
  eleimage.classList.add('card-image');
  let eleinfo = document.createElement('div');
  eleinfo.classList.add('card-info');
  let eleprice = document.createElement('div');
  eleprice.classList.add('card-price');
  eleimage.innerHTML = '<img src="' + '../' + product.path + '" alt="' + product.name +'">';
  eleinfo.innerHTML = '<h3>' +  product.name + '</h3>'
                      + '<div id="categor">' + cat + '</div>'
                      + '<div id="frequency">' + frequency + '</div>';
  eleprice.innerHTML = ' <div class="incdec"> <button id="plus"></button>' + 
                      '<button id="minus"> </button> </div>'
                      +  '&#8377; ' + product.price;
  elecard.appendChild(eleimage);
  elecard.appendChild(eleinfo);
  elecard.appendChild(eleprice);
  cartSection.appendChild(elecard);
}


function setItems(total, cart, products){
  // take frequency from cart
  // take product information from products
  // display in order of cart array
  let totPrice = 0;
  for (let i = 0; i < cart.length; i++)
  {
    let cartItem = cart[i];
    let product = products.filter(product => product.id === cartItem.id);
    totPrice += product[0].price * cartItem.frequency;
    displayCard(product[0], cartItem.frequency);
  }
  summary.innerHTML = '<div>' + 'Total Items: '  + total + '</div>'+'<div>Subtotal: '+ totPrice + '</div>';
}



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


