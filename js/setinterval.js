window.addEventListener('DOMContentLoaded', function () {
  'use strict';


  function getTimeRemaining(deadlineTime) {
    let dateStop = Date.parse(deadlineTime) - Date.parse(new Date()),
      seconds = Math.floor((dateStop / 1000) % 60),
      minutes = Math.floor((dateStop / 1000 / 60) % 60),
      hours = Math.floor((dateStop / (1000 * 60 * 60)) % 24);
    return {
      dateStop,
      hours,
      minutes,
      seconds
    };
  }

  function initializeClock(endTime) {
    let timerHours = document.querySelector('#timer-hours');
    let timerMinutes = document.querySelector('#timer-minutes');
    let timerSeconds = document.querySelector('#timer-seconds');

    function updateClock() {
      let timer = getTimeRemaining(endTime);

      timerHours.textContent = ('0' + timer.hours).slice(-2);
      timerMinutes.textContent = ('0' + timer.minutes).slice(-2);
      timerSeconds.textContent = ('0' + timer.seconds).slice(-2);
      if (timer.dateStop <= 0) {
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
        clearInterval(idTimer);
      }

    }

    updateClock();
    let idTimer = setInterval(updateClock, 1000);
  }

   let deadLine = new Date(Date.parse(new Date()) + 0.001 * 60 * 60 * 1000); // Для счетчика по времени
  //let deadLine = '2019-09-19'; // Для счетчика по дате
  initializeClock(deadLine);





});