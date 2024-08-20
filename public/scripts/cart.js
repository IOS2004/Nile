let cartSection = document.querySelector('.addedItems');
let summary = document.querySelector('.total');
let checkout = document.querySelector('.checkout_btn');

checkout.addEventListener('click', () => {
  alert('Feature is not available yet');
})

cartSection.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    let button = e.target;
    let card = button.closest('.cart-card');
    let cardFreq = card.querySelector('#frequency');
    let productId = card.getAttribute('id');
    let buttonType = button.getAttribute('id'); 
 
    const storedUserData=JSON.parse(localStorage.getItem('UserData'));
    if(buttonType==="plus")
    {
        const index = storedUserData.cart.findIndex(item => {return Number(item.id) === Number(productId)});
        storedUserData.cart[index].frequency++;
        
      let totPrice = Number(localStorage.getItem('totalPrice'));
      let total = localStorage.getItem('totalQty');
      total++;
      totPrice += Number(card.getAttribute('price'));
      summary.innerHTML =   '<div>' + 'Total Items: '  + total + '</div>'+'<div>Subtotal: &#8377; '+ totPrice.toFixed(2) + '</div>';
      localStorage.setItem('totalPrice', totPrice);
      localStorage.setItem('totalQty', total);
      cardFreq.textContent = 'QTY ' + storedUserData.cart[index].frequency;
      localStorage.setItem('UserData', JSON.stringify(storedUserData));

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
    else
    {
  const index = storedUserData.cart.findIndex(item => Number(item.id) === Number(productId));
      if (index !== -1) {
          if (storedUserData.cart[index].frequency > 1) {
            storedUserData.cart[index].frequency--;
            cardFreq.textContent = 'QTY ' + storedUserData.cart[index].frequency;   
          } else {
            storedUserData.cart.splice(index, 1); 
            cartSection.removeChild(card);
          }
          localStorage.setItem('UserData', JSON.stringify(storedUserData));
          let totPrice = Number(localStorage.getItem('totalPrice'));
          let total = localStorage.getItem('totalQty');
          total--;
          totPrice -= Number(card.getAttribute('price'));
          summary.innerHTML =   '<div>' + 'Total Items: '  + total + '</div>'+'<div>Subtotal: &#8377; '+ totPrice.toFixed(2) + '</div>';
          localStorage.setItem('totalPrice', totPrice);
          localStorage.setItem('totalQty', total);   

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
            calculateTotalFrequency(storedUserData.cart);
          })
          .catch(error => console.error('Error updating cart:', error));
        }
    }}
})


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
                      + '<div id="frequency"> QTY: ' + frequency + '</div>';
  eleprice.innerHTML = ' <div class="incdec"> <button id="plus"></button>' + 
                      '<button id="minus"> </button> </div>'
                      +  '&#8377; ' + product.price;
  elecard.setAttribute('id', product.id);       
  elecard.setAttribute('price', product.price);             
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
  localStorage.setItem('totalPrice', totPrice.toFixed(2));
  localStorage.setItem('totalQty', total);
  summary.innerHTML = '<div>' + 'Total Items: '  + total + '</div>'+'<div>Subtotal: &#8377; '+ totPrice.toFixed(2) + '</div>';
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
     localStorage.setItem('UserData', JSON.stringify(data));
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


