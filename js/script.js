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
    let id;

    function updateClock() {
      const timer = getTimeRemaining();
      timerHours.textContent = ('0' + timer.hours).slice(-3);
      timerMinutes.textContent = ('0' + timer.minutes).slice(-2);
      timerSeconds.textContent = ('0' + timer.seconds).slice(-2);

      if (timer.timeRemaining > 0) {
        setTimeout(updateClock, 1000);
      } else {
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
        clearInterval(id);
      }
    }
    updateClock();
    id = setTimeout(updateClock, 1000);
  }
  countTimer('30 september 2019');

  // Меню

  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul > li');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));

  };

  toggleMenu();

  //Popup Window

  const togglePopup = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popupClose = document.querySelector('.popup-close');

    popup.style = `display: block; transform: translateX(-100%);`;
    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        if (!popup.style.transaform || popup.style.transaform === `translateX(-100%)`) {
          popup.style = `display: block; transform: translateX(0); transition: 1s ease;`;
        } else {
          popup.style = `display: block; transform: translateX(-100%);`;
        }
      });
    });
    popupClose.addEventListener('click', () => {
      popup.style = `display: block; transform: translateX(-100%); transition: 1s ease;`;
    });
  };
  togglePopup();

  // Табы 

  const tabs = () => {
    const tabHeaders = document.querySelector('.service-header'),
      tab = tabHeaders.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeaders.addEventListener('click', (event) => {
      let target = event.target;
      while (target !== tabHeaders) {
        if (target.classList.contains('service-header-tab')) {
          tab.forEach((item, i) => {
            if (item === target) {
              toggleTabContent(i);
            }
          });
          return;
        }
        target = target.parentNode;
      }
    });
  };

  tabs();
});