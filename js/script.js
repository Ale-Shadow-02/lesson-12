window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Таймер 
  function countTimer(deadline) {
    const timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
      return {
        timeRemaining,
        hours,
        minutes,
        seconds
      };
    }

    function updateClock() {
      const timer = getTimeRemaining();

      timerHours.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;

      if (timer.timeRemaining > 0) {
        setInterval(updateClock, 1000);
      } 
    }
    updateClock();
  }

  countTimer('18 september 2019');

  /* Первым аргументом передаётся функция колбэк */
  /* Вторым аргументом передаётся количество миллисекунд через которое должна выполниться колбэк функция */
  /* Третий не обязательный параметр, - это значение которое мы можем передать аргументом в колбэк функцию */
  
  // setInterval((arg) => {
  //   console.log("Я колбэк функция setInterval, выполняюсь через 1000 милисекунд." + arg);
  // }, 1000, " А я аргумент который может передаваться в колбэк функцию.");

  // /* Функцию  колбэк можно вынести за пределы setInterval и сделать например вот так */
  // function funcCallBack(arg) {
  //   console.log("Я колбэк функция setInterval, выполняюсь через 1000 милисекунд." + arg);
  // }

  // setInterval(funcCallBack, 1000, " А я аргумент который может передаваться в колбэк функцию.");

});