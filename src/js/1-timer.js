import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  position: 'topRight',
});

let userSelectedDate;
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const currentDate = new Date();
    if (userSelectedDate <= currentDate) {
      startButton.setAttribute('disabled', 'true');
      iziToast.show({
        title: 'Error',
        message: 'Please choose a date in the future',
        backgroundColor: '#EF4040',
        titleColor: '#FFFFFF',
        messageColor: '#FFFFFF',
        progressBarColor: '#FFBEBE',
        close: false,
        progressBar: true,
      });
    } else {
      startButton.removeAttribute('disabled');
    }
  },
};

const fp = flatpickr('#datetime-picker', options);

function startCountdown() {
  const countdownInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    const timeDifference = userSelectedDate - currentTime;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      displayTime(0);
      return;
    }

    displayTime(timeDifference);
  }, 1000);
}

function displayTime(time) {
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);

  daysElement.textContent = formatTime(days);
  hoursElement.textContent = formatTime(hours);
  minutesElement.textContent = formatTime(minutes);
  secondsElement.textContent = formatTime(seconds);
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

startButton.addEventListener('click', startCountdown);
