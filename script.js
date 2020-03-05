const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let userData = [];

getRandomUsers();
getRandomUsers();
getRandomUsers();

//fetch random user and add money
async function getRandomUsers() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  addData(newUser);
}

function addData(obj) {
  userData.push(obj);

  updateDOM();
}

function updateDOM(providedData = userData) {
  //Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> $ ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

//Format number as money
function formatMoney(money) {
  return money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Double Money
function doubleMoney() {
  userData = userData.map(user => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

//Sort By Richest
function sortByRichest() {
  userData.sort((a, b) => b.money - a.money);
  updateDOM();
}

//Show Millionaires
function showMillionaires() {
  userData = userData.filter(item => item.money > 1000000);
  updateDOM();
}

//Total the wealth
function calculateWealth() {
  const wealth = userData.reduce((acc, item) => acc + item.money, 0);
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong> $ ${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

//Event Listeners
addUserBtn.addEventListener('click', getRandomUsers);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
