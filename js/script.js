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
  countTimer('13 October 2019');

  // Меню

  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      menuItems = menu.querySelectorAll('ul > li');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));

    document.addEventListener('click', (event) => {
      let target = event.target;

      target = target.closest('.menu');
      if (btnMenu === target) {
        menu.classList.add('active-menu');
      } else if (!event.target.classList.contains('active-menu')) {
        menu.classList.remove('active-menu');
      }
    });

  };

  toggleMenu();

  //Popup Window

  const togglePopup = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popupContent = document.querySelector('.popup-content');

    popup.style.cssText = `display: block; transform: translateX(-100%);`;
    //popupContent.style.cssText = `display: block; transform: translateX(-100%);`;
    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        if (!popup.style.transaform || popup.style.transaform === `translateX(-100%)`) {
          popup.style.cssText = `display: block; transform: translateX(0); transition: 1s ease;`;
        } else {
          popup.style.cssText = `display: block; transform: translateX(-100%);`;
        }
      });
    });

    popup.addEventListener('click', (event) => {
      let target = event.target;
      if (target.classList.contains('popup-close')) {
        popup.style.cssText = `display: block; transform: translateX(-100%); transition: 1s ease;`;
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          popup.style.cssText = `display: block; transform: translateX(-100%); transition: 1s ease;`;
        }
      }
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
      target = target.closest('.service-header-tab');
      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };

  tabs();

  // Слайдер 

  const slider = () => {
    const slider = document.querySelector('.portfolio-content'),
      slide = document.querySelectorAll('.portfolio-item'),
      btn = document.querySelectorAll('.portfolio-btn'),
      portfolioDots = document.querySelector('.portfolio-dots');
    let addClassDot = () => {
      for (let i = 0; i < slide.length; i++) {
        const li = document.createElement('li');
        li.className = (i === 0) ? 'dot dot-active' : 'dot';
        portfolioDots.appendChild(li);
      }
    };

    addClassDot();

    const dot = document.querySelectorAll('.dot');

    let currentSlide = 0,
      interval;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') ||
        event.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') ||
        event.target.matches('.dot')) {
        startSlide();
      }
    });

    startSlide(1500);
  };
  slider();

  //Секция наша команда Замена фото при наведении мышы

  const mouseHover = () => {
    const commandPhoto = document.querySelectorAll('img.command__photo');
    commandPhoto.forEach((elem) => {
      let imgSrc = elem.src;
      elem.addEventListener('mouseenter', ({
        target
      }) => {
        target.src = target.dataset.img;
      });
      elem.addEventListener('mouseleave', ({
        target
      }) => {
        target.src = imgSrc;
      });

    });
  };
  mouseHover();
  // Проверка инпутов на число
  const inputValid = () => {
    const input = document.querySelectorAll('.calc-block > input');
    input.forEach((elem) => {
      elem.addEventListener('input', () => {
        elem.value = elem.value.replace(/\D/g, '');
      });
    });
  };
  inputValid();

  // Калькулятор

  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcSquare = document.querySelector('.calc-square'),
      calcCount = document.querySelector('.calc-count'),
      calcDay = document.querySelector('.calc-day'),
      totalValue = document.getElementById('total');

    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue && +calcCount.value && +calcDay.value) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }

      totalValue.textContent = Math.ceil(total);
    };

    calcBlock.addEventListener('change', ({
      target
    }) => {
      if (target.matches('select') || target.matches('input')) {
        countSum();
      }
    });


  };
  calc(100);

  // Send-Ajax-Form 
  const sendForm = () => {
    const errorMessage = 'Что то пошло не так...',
      loadMessage = 'Загрузка...',
      successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const statusMessage = document.createElement('div');

    const forms = document.querySelectorAll('form');
    forms.forEach((elem) => {
      elem.addEventListener('submit', (event) => {
        event.preventDefault();
        elem.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;
        statusMessage.style.cssText = 'color: white;';
        const formData = new FormData(elem);

        let body = {};

        formData.forEach((val, key) => {
          body[key] = val;
        });

        postData(body)
          .then(() => {
            statusMessage.textContent = successMessage;
          })
          .catch((error) => {
            statusMessage.textContent = errorMessage;
            console.log(error);
          });
      });
    });


    const postData = (body) => {
      return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.addEventListener('readystatechange', () => {
          if (request.readyState !== 4) {
            return;
          }
          if (request.status === 200) {
            resolve();
          } else {
            reject(request.status);
          }
        });

        request.open('POST', './server.php');
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(body));
      });
    };

  };

  sendForm();


});