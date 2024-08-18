let showcase = document.querySelector('.showcase');
function addItem(parent, name, path, price, category, id)
{
  let item = document.createElement('div');
  item.classList.add('product-card');
  item.setAttribute('link', `product_page.html?id=${id}`);
  item.innerHTML = '<img src="' + path + '" alt="' + name + '"> ' + '<div id="product_name">' + name + '</div>' + '<div id="categ">' + category + '</div>'+ '<div id="product_price"> &#8377; ' + price + '</div>';
  parent.appendChild(item);
}

function getRandom(a, b)
{
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

function displayAll (ovd, ied, ebd)
{
  showcase.innerHTML = '';
  // use randomizer
  let i = 0;
  let j = 0;
  let k = 0;
  while (i < ovd.length || j < ied.length || k < ebd.length)
  {
    // choose random item
    let ran = getRandom(1, 3);
    if (ran == 1 && i != ovd.length) 
    {
      addItem(showcase, ovd[i].name, "../" + ovd[i].path, ovd[i].price, 'Over Ear', ovd[i].id);
      i++;
    }
    else if (ran == 2 && j != ied.length)
    {
      addItem(showcase, ied[j].name, "../" + ied[j].path, ied[j].price, 'In Ear', ied[j].id);
      j++;
    }
    else if (k != ebd.length) {
      addItem(showcase, ebd[k].name, "../" + ebd[k].path, ebd[k].price, 'Ear Buds', ebd[k].id);
      k++;
    }
  }
}

function displayOverTheEar (ovd) {
  showcase.innerHTML = '';
  for (let i = 0; i < ovd.length; i++)
  {
    addItem(showcase, ovd[i].name, "../" + ovd[i].path, ovd[i].price, 'Over Ear', ovd[i].id);
  }
}

function displayInEarMonitor(ied) {
  showcase.innerHTML = '';
  for (let i = 0; i < ied.length; i++)
  {
    addItem(showcase, ied[i].name, "../" + ied[i].path, ied[i].price, 'In Ear', ied[i].id);
  }
}

function displayEarBuds(ebd) {
  showcase.innerHTML = '';
  for (let i = 0; i < ebd.length; i++)
  {
    addItem(showcase, ebd[i].name, "../" + ebd[i].path, ebd[i].price, 'Ear Buds', ebd[i].id);
  }
}


let overEar = document.querySelector('#overEar');
let all = document.querySelector('#All');
let InEar = document.querySelector('#InEar');
let EarBuds = document.querySelector('#EarBuds');

showcase.addEventListener('click', (event) => {
  // Check if the clicked element is a product card
  let card = event.target.closest('.product-card');
  if (card) {
    let link = card.getAttribute('link');
    window.location.href = link;
  }
});

document.addEventListener("DOMContentLoaded",function(){
  fetch('/nile/shop/products')
  .then(response => response.json())
  .then(data => {
    update_products(data);
  })
})

let isLogin = localStorage.getItem('islogged');
let lbtn = document.querySelector('#login-btn');

if (isLogin == 't') {
  lbtn.href = "profile.html";
  lbtn.innerHTML = 'Profile';
}
else
{
  lbtn.href = "/nile/login";
  lbtn.innerHTML = 'Login';
}

function update_products(data) {
  // sort product based on category
  let overEarData = data.filter(item => /overEar/.test(item.path));
  let inEarData = data.filter(item => /inEar/.test(item.path));
  let earBudsData = data.filter(item => /earBuds/.test(item.path));
  displayAll(overEarData, inEarData, earBudsData);
  overEar.addEventListener('click', () => {
    displayOverTheEar(overEarData);
  })
  
  all.addEventListener('click', () => {
    displayAll(overEarData, inEarData, earBudsData);
  })
  
  InEar.addEventListener('click', () => {
    displayInEarMonitor(inEarData);
  })
  
  EarBuds.addEventListener('click', () => {
    displayEarBuds(earBudsData);
  })

}