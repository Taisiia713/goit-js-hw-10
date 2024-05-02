// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// календар

const datePicker = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const userSelectedDate = selectedDates[0];
    const currentDate = new Date();
    if (userSelectedDate <= currentDate) {
      window.alert('Please choose a date in the future');
    }
  },
});

let intervalId = null;
const startBtn = document.querySelector('[data-start]');
const clockFace = document.querySelector('.value');
let userSelectedDate = 0; // ?????????????????????????????????????????????????????///
let time = 0; // ????????????????????????????????????????????????????????????????????????????????????????????

startBtn.addEventListener('click', () => {
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const diff = currentTime - userSelectedDate; // ??????????????????????????????????????????

    const time = formatTime(diff);
    // updateTimeDisplay(clockFace).textContent = time; ????????????????????????????????????????????????????

    console.log(time);
  });
});

// Вибір дати

document.querySelector('[data-start]').addEventListener('click', () => {
  const userSelectedDate = datePicker.selectedDates[0];
  const currentDate = new Date();

  if (userSelectedDate > currentDate) {
    const difference = userSelectedDate - currentDate;
    const intervalId = setInterval(() => {
      const timeLeft = userSelectedDate - new Date();
      if (timeLeft <= 0) {
        clearInterval(intervalId);
        updateTimeDisplay({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        document.querySelector('[data-start]').disabled = false;
      } else {
        const timeLeftObj = formatTime(timeLeft);
        updateTimeDisplay(timeLeftObj);
      }
    }, 1000);
    document.querySelector('[data-start]').disabled = true;
  }
});

// Форматування часу в години

const formatTime = milliseconds => {
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
  const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);

  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0'),
  ].join(':');
};

// Зміна часу на годиннику

function updateTimeDisplay({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = time;
  document.querySelector('[data-hours]').textContent = time;
  document.querySelector('[data-minutes]').textContent = time;
  document.querySelector('[data-seconds]').textContent = time;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
