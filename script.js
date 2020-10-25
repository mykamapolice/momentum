// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  day = document.querySelector('.week'),
  weatherIcon = document.querySelector('.weather-icon'),
  temperature = document.querySelector('.temperature'),
  weatherDescription = document.querySelector('.weather-description'),
  city = document.querySelector('.city');

// Options
const showAmPm = true;

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

  setTimeout(showTime, 1000);
  if (sec === 0 && min === 0) {
    setBgGreet();
  }
}

const base = './assets/images/';
const daybase = ['morning/', 'day/', 'evening/', 'night/'];
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg'];
let i = 0;
let x = 0;

function showDayAndMonth() {
  let today = new Date(),
    week = ['Sunday', 'Monday', 'Thuesday', 'Wensday', 'Thursday', 'Friday', 'Saturday'],
    mounth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Devember'],
    numb = today.getDate(),
    weekDay = today.getDay(),
    mounthDay = today.getMonth();

  day.innerHTML = `${week[weekDay]}<span>, </span>${numb}<span> of </span>${mounth[mounthDay]}`;

  setTimeout(showDayAndMonth, 1000 * 3600 * 24);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date();
    hour = today.getHours();
    let hours;
    let srcc;

  if (hour >= 6 && hour < 12) {
    hours = hour - 5;
    srcc =`0${hours}.jpg`
    document.body.style.backgroundImage =
      `url('./assets/images/morning/${srcc}')`;
    greeting.textContent = 'Good Morning, ';
  } else if (hour >= 12  && hour < 18) {
    hours = hour - 11;
    srcc =`0${hours}.jpg`
    document.body.style.backgroundImage =
    `url('./assets/images/day/${srcc}')`;
    greeting.textContent = 'Good Afternoon, ';
  } else if (hour >= 18 && hour < 24) {
    hours = hour - 17;
    srcc =`0${hours}.jpg`
    document.body.style.backgroundImage =
    `url('./assets/images/evening/${srcc}')`;
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  } else {
    hours = hour + 1;
    srcc =`0${hours}.jpg`
    document.body.style.backgroundImage = 
    `url('./assets/images/night/${srcc}')`;
    greeting.textContent = 'Good Night, ';
  }
  setTimeout(setBgGreet, 1000 * 3600);
}

function updateName() {
  if(name.textContent === "") {
    name.textContent = "[Enter Name]";
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
      updateName();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
    updateName();
  }
}


function updateFocus() {
  if(focus.textContent === '') {
    focus.textContent = '[Enter Focus]';
  }
}


// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
      updateFocus();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
    updateFocus();
  }
}



name.onclick = function() {
  if (name.textContent == ""){
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = "";
  }
}

focus.onclick = function() {
  if (focus.textContent == ""){
    focus.textContent = '[Enter Name]';
  } else {
    focus.textContent = "";
  }
} 




function viewBgImage(data) {
  const body = document.querySelector('body');
  const src = data;
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {      
    body.style.backgroundImage = `url(${src})`;
  }; 
}


function getImage() {
  const index = i % images.length;
  const xindex = x % daybase.length;
    const imageSrc = base + daybase[xindex] + images[index];
    viewBgImage(imageSrc);
    i++;
    if (i === 5) {
      x++;
      i = 0;
    }
    btn.disabled = true;
    setTimeout(function() { btn.disabled = false }, 1000);
};


const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn__qoute = document.querySelector('.btn__qoute');
localStorage.setItem('city', 'Gdansk');

async function getQuote() {  
  const url = `https://favqs.com/api/qotd`;
  const res = await fetch(url);
  const data = await res.json(); 
  blockquote.textContent = data.quote.body;
  figcaption.textContent = data.quote.author;
};

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=6c2f823b0b920f88222edd87abcce65c&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
};

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur;
  }
}

function setNCity(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('city', e.target.innerText);
      city.blur();
      updateCity();
    }
  } else {
    localStorage.setItem('city', e.target.innerText);
    updateCity();
  }
}

function updateCity () {
  if (city.textContent === "") {
    city.textContent === ""
  }
}


city.onclick = function() {
    city.textContent = "";
}




document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

document.addEventListener('DOMContentLoaded', getQuote);
btn__qoute.addEventListener('click', getQuote);

const btn = document.querySelector('.btn');
btn.addEventListener('click', getImage);

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
showTime();
showDayAndMonth();
setBgGreet();
getName();
getFocus();
updateName();
updateFocus();
getWeather();
setNCity(e)