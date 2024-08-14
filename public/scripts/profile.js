const storedUserData = localStorage.getItem('UserData');
let userData;
if (storedUserData) {
  userData = JSON.parse(storedUserData);
  console.log(userData);
}
let username = userData.username;
let email = userData.email;

// helper functions

function getRandom(a, b)
{
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

// logic to get Random image for profile
// set random pfpimage
let pfpimage = document.querySelector('#pimg');
pfpimage.innerHTML = '<img src="../images/profile_images/' + getRandom(0, 5) + '.svg" alt="profile picture">';

// set name
let pname = document.querySelector('#pname');
pname.textContent = username.toUpperCase();
let pemail = document.querySelector('#pemail');
pemail.textContent = email;

// logout function 
let logOut = document.querySelector('#logout');
logOut.addEventListener('click', () => {
  alert("lode te lassan");
});

// favourites scroller
function addItem(parent, name, path, price, page)
{
  let item = document.createElement('div');
  item.classList.add('item-card');
  item.innerHTML = '<img src="' + path + '" alt="' + name + '"> ' + name + '<div> &#8377; ' + price + '.00</div> <a href="'+ page + '"> shop now &#8594; </a>';
  parent.appendChild(item);
}
let favs = document.querySelector('#favourites');

function createProductPage()
{
  return '#';
}

for (let i = 0; i < 6; i++)
  {
    addItem(favs, "best selling headphone " + i, "../images/bestselling/" + i + ".jpg", getRandom(1000, 15000), createProductPage() );
  }
  