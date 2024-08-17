function addItem(parent, name, path, price, page)
{
  let item = document.createElement('div');
  item.classList.add('item-card');
  item.innerHTML = '<img src="' + path + '" alt="' + name + '"> ' + name + '<div> &#8377; ' + price + '.00</div> <a href="'+ page + '"> shop now &#8594; </a>';
  parent.appendChild(item);
}
let favs = document.querySelector('#similar');

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
  addItem(favs, "best selling headphone " + i, "../images/bestselling/" + i + ".jpg", getRandom(1000, 15000), createProductPage() );
}

let image = document.querySelector('.item-showcase');

image.innerHTML = '<img src="../images/bestselling/1.jpg" alt="name">';