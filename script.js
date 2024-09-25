const backgroundElement = document.querySelector('.bg');
const clockElement = document.querySelector('.clock');
const dateElement = document.querySelector('.date');
const cityElement = document.querySelector('.city');
const tempElement = document.querySelector('.weather-temperature');
const descriptionElement = document.querySelector('.weather-description');

const WEATHER_API_KEY = 'a641e487284291b3b714caeac6f11871';

function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

function changeBackground(hours) {
  if (hours >= 0 && hours < 6) {
    backgroundElement.style.backgroundImage = 'url("assets/images/01.jpg")';
  } else if (hours >= 6 && hours < 12) {
    backgroundElement.style.backgroundImage = 'url("assets/images/02.jpg")';
  } else if (hours >= 12 && hours < 18) {
    backgroundElement.style.backgroundImage = 'url("assets/images/03.jpg")';
  } else {
    backgroundElement.style.backgroundImage = 'url("assets/images/04.jpg")';
  }
}

function showTimeDateBlock() {
  const currentTimestamp = new Date();
  const hours = currentTimestamp.getHours();
  const minutes = currentTimestamp.getMinutes();
  const seconds = currentTimestamp.getSeconds();

  const currentTime = `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;

  let optionsDate = {
    month: "long",
    day: "numeric",
  }

  const currentDate = `${currentTimestamp.toLocaleDateString("ru-RU", optionsDate)}, ${currentTimestamp.toLocaleDateString("ru-RU", { weekday: 'long' })}`

  clockElement.textContent = currentTime;
  dateElement.textContent = currentDate;
  changeBackground(hours);
}

function getPositionFromLocalStorage() {
  const storedCity = localStorage.getItem('position');
  return storedCity ? JSON.parse(storedCity) : { lat: 45.0355, lon: 38.9753 };
}

function setPositionToLocalStorage(latitude, longitude) {
  localStorage.setItem('position', JSON.stringify({ lat: latitude, lon: longitude }));
}

function getPositionByGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      setPositionToLocalStorage(latitude, longitude);
      getWeather();
    }, (error) => {
      console.error(`Error occurred. Error code: ${error.code}`);
      getWeather();
    });
  } else {
    console.error("Geolocation is not supported by this browser.");
    getWeather();
  }
}

async function getWeather() {
  const currentPosition = getPositionFromLocalStorage();

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${currentPosition.lat}&lon=${currentPosition.lon}&appid=${WEATHER_API_KEY}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      const temp = data.main.temp;
      const description = data.weather[0].description;

      cityElement.textContent = data.name;
      tempElement.textContent = `${data.main.temp.toFixed(0)}°C`;
      descriptionElement.textContent = description;
    } else {
      console.log('Error:', data.message);
    }
  } catch (error) {
    console.log(error);
  }
}

showTimeDateBlock();
setInterval(showTimeDateBlock, 1000);
getPositionByGeolocation();
