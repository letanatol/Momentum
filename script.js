const clockElement = document.querySelector('.clock');
const dateElement = document.querySelector('.date');
const backgroundElement = document.querySelector('.bg');

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

  const currentTime = `${hours}:${addZero(minutes)}:${addZero(seconds)}`;

  let optionsDate = {
    month: "long",
    day: "numeric",
  }

  const currentDate = `${currentTimestamp.toLocaleDateString("ru-RU", optionsDate)}, ${currentTimestamp.toLocaleDateString("ru-RU", { weekday: 'long' })}`

  clockElement.textContent = currentTime;
  dateElement.textContent = currentDate;
  changeBackground(hours);
}

setInterval(showTimeDateBlock, 1000);
