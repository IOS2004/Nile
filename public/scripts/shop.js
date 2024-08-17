let showcase = document.querySelector('.showcase');
function addItem(parent, name, path, price, page, category)
{
  let item = document.createElement('div');
  item.classList.add('product-card');
  item.setAttribute('link', 'product_page.html');
  item.innerHTML = '<img src="' + path + '" alt="' + name + '"> ' + '<div id="product_name">' + name + '</div>' + '<div id="categ">' + category + '</div>'+ '<div id="product_price"> &#8377; ' + price + '.00</div>';
  parent.appendChild(item);
}

function getRandom(a, b)
{
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

function displayAll ()
{
  showcase.innerHTML = '';
  for (let i = 0; i < 6; i++)
    {
      addItem(showcase, "Classic headphone " + i, "../images/classics/" + i + ".jpg",  getRandom(1000, 15000), '/nile' , 'Headphone');
    }
    
    for (let i = 0; i < 6; i++)
    {
    addItem(showcase, "Best selling headphone " + i, "../images/bestselling/" + i + ".jpg",  getRandom(1000, 15000), '/nile' , 'Headphone');
    }
    
    for (let i = 0; i < 7; i++)
    {
      addItem(showcase, "Featured headphone " + i, "../images/featured/" + i + ".jpg",  getRandom(1000, 15000), '/nile' , 'Headphone');
    }
}

function displayOverTheEar () {
  showcase.innerHTML = '';
  for (let i = 0; i < 6; i++)
    {
      addItem(showcase, "Classic headphone " + i, "../images/classics/" + i + ".jpg",  getRandom(1000, 15000), '/nile' , 'Headphone');
    }
    
}

function displayInEarMonitor() {
  showcase.innerHTML = '';
  for (let i = 0; i < 6; i++)
    {
    addItem(showcase, "Best selling headphone " + i, "../images/bestselling/" + i + ".jpg",  getRandom(1000, 15000), '/nile' , 'Headphone');
    }
}

function displayEarBuds() {
  showcase.innerHTML = '';
  for (let i = 0; i < 7; i++)
    {
      addItem(showcase, "Featured headphone " + i, "../images/featured/" + i + ".jpg",  getRandom(1000, 15000), '/nile' , 'Headphone');
    }
}

displayAll();

let overEar = document.querySelector('#overEar');
let all = document.querySelector('#All');
let InEar = document.querySelector('#InEar');
let EarBuds = document.querySelector('#EarBuds');

overEar.addEventListener('click', () => {
  displayOverTheEar();
})

all.addEventListener('click', () => {
  displayAll();
})

InEar.addEventListener('click', () => {
  displayInEarMonitor();
})

EarBuds.addEventListener('click', () => {
  displayEarBuds();
})


showcase.addEventListener('click', (event) => {
  // Check if the clicked element is a product card
  let card = event.target.closest('.product-card');
  if (card) {
    let link = card.getAttribute('link');
    window.location.href = link;
  }
});