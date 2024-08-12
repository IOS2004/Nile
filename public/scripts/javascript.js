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
  addItem(scroller, "best selling headphone " + i, "images/bestselling/" + i + ".jpg", getRandom(1000, 15000), createProductPage() );
}

for (let i = 0; i < 6; i++)
{
  addItem(scroller2, "classic headphone " + i, "images/classics/" + i + ".jpg",  getRandom(1000, 15000), createProductPage() );
}

for (let i = 0; i < 7; i++)
{
  addItem(scroller3, "featured headphone " + i, "images/featured/" + i + ".jpg",  getRandom(1000, 15000), createProductPage() );
}


// Managing profile

let login_btn = document.querySelector("#login-btn");

function updateLoginStatus(str, isLogin) {
  // handle status
  if (isLogin) {
    login_btn.href = "pages/profile.html";
    login_btn.innerHTML = '<img alt="Profile" src="images/profile.png"></img>';
  }
  else
  {
    login_btn.href = "/nile/login";
    login_btn.innerHTML = 'Login';
  }
}

function handleData() {
  // This function will be called after the data is fetched

}

// Fetch data and handle it
fetch('/nile/auth-status')
  .then(response => response.json())
  .then(data => {
    handleData(); // Call the function that uses the fetched data
    if (data) {
      const name = data.username;
      const email = data.email;
      updateLoginStatus(name, true);
      console.log(data);
      console.log(`Username: ${name}, Email: ${email}`);
    } else {
      updateLoginStatus("Not logged in", false);
    }
  })
  .catch(error => {
    console.log(error);
  });

  