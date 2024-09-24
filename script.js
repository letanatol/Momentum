const clockElement = document.querySelector('.clock');
const dateElement  = document.querySelector('.date');

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
  dateElement .textContent = currentDate;
}

setInterval(showTimeDateBlock, 1000);

function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}