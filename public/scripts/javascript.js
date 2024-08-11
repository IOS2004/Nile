/* populate scrollers */

let scroller = document.querySelector('#bestSelling');
let scroller2 = document.querySelector('#classic');
let scroller3 = document.querySelector('#featured');

function addItem(parent, name, path, price, page)
{
  let item = document.createElement('div');
  item.classList.add('item-card');
  item.innerHTML = '<img src="' + path + '" alt="' + name + '"> ' + name + '<div> &#8377; ' + price + '.00</div> <a href="'+ page + '"> shop now &#8594; </a>';
  parent.appendChild(item);
}

function createProductPage()
{



  return '#';
}

function getRandom(a, b)
{
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

for (let i = 0; i < 6; i++)
{
  addItem(scroller, "best selling headphone " + i, "public/images/bestselling/" + i + ".jpg", getRandom(1000, 15000), createProductPage() );
}

for (let i = 0; i < 6; i++)
{
  addItem(scroller2, "classic headphone " + i, "public/images/classics/" + i + ".jpg",  getRandom(1000, 15000), createProductPage() );
}

for (let i = 0; i < 7; i++)
{
  addItem(scroller3, "featured headphone " + i, "public/images/featured/" + i + ".jpg",  getRandom(1000, 15000), createProductPage() );
}

/* Product page */
let header = document.querySelector('#mainHeader');
let footer = document.querySelector('#mainFooter');
let test = document.querySelector("#test");
test.addEventListener('click', () => {
  const content = header.outerHTML;
  const content2 = footer.outerHTML;
  localStorage.setItem('header', content);
  localStorage.setItem('footer', content2);
  console.log(localStorage.getItem('header'));
  console.log(localStorage.getItem('footer'));
  prompt('hello');
  window.location.href = 'public/pages/product_page.html';
});