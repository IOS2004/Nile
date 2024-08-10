let scroller = document.querySelector('#bestSelling');
let scroller2 = document.querySelector('#classic');
let scroller3 = document.querySelector('#featured');

function addItem(parent, name, path, price)
{
  let item = document.createElement('div');
  item.classList.add('item-card');
  item.innerHTML = '<img src="' + path + '" alt="' + name + '"> ' + name + '<div> &#8377; ' + price + '</div> <a href="#"> shop now &#8594; </a>';
  parent.appendChild(item);
}

for (let i = 0; i < 6; i++)
{
  addItem(scroller, "best selling headphone " + i, "public/images/bestselling/" + i + ".jpg", (i + 1) * 1000 );
}

for (let i = 0; i < 6; i++)
{
  addItem(scroller2, "classic headphone " + i, "public/images/classics/" + i + ".jpg", (i + 1) * 1000 );
}

for (let i = 0; i < 7; i++)
{
  addItem(scroller3, "featured headphone " + i, "public/images/featured/" + i + ".jpg", (i + 1) * 1000 );
}