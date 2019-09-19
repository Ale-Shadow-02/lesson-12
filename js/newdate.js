window.addEventListener('DOMContentLoaded', function () {
   'use strict';

   const date = new Date();
   console.log('date: ', date); //Для проверки даты

   let newDiv = document.createElement('div'),
      newDiv1 = document.createElement('p'),
      newDiv2 = document.createElement('p'),
      newDiv3 = document.createElement('p');
   document.body.appendChild(newDiv);
   document.body.appendChild(newDiv1);
   document.body.appendChild(newDiv2);
   document.body.appendChild(newDiv3);
   let script = document.getElementsByTagName('script')[0];

   function newHours(Hours) {
      if (Hours >= 5 && Hours < 12) {
         newDiv.innerHTML = '<p>Доброе утро!</p>';
         return document.body.insertBefore(newDiv, script);
      } else if (Hours >= 12 && Hours < 18) {
         newDiv.innerHTML = '<p>Добрый день!</p>';
         return document.body.insertBefore(newDiv, script);
      } else if (Hours >= 18 && Hours <= 23) {
         newDiv.innerHTML = '<p>Добрый вечер!</p>';
         return document.body.insertBefore(newDiv, script);
      } else {
         newDiv.innerHTML = '<p>Доброй ночи!</p>';
         return document.body.insertBefore(newDiv, script);
      }
   }

   newHours(date.getHours());

   let day = new Date();
   let weekday = new Array(7);
   weekday[0] = "Воскресенье";
   weekday[1] = "Понедельник";
   weekday[2] = "Вторник";
   weekday[3] = "Среда";
   weekday[4] = "Четверг";
   weekday[5] = "Пятница";
   weekday[6] = "Суббота";
   newDiv1.innerHTML = 'Сегодня: ' + weekday[day.getDay()];
   document.body.insertBefore(newDiv1, script);

   newDiv2.innerHTML = 'Текущее время: ' + day.toLocaleTimeString();
   document.body.insertBefore(newDiv2, script);

   //Разбить строку по точке в массив[дата, месяц, год], у сегодняшней даты сбросить часы, минуты, секунды, миллисекунды на ноль - чтобы тоже начало дня было.Посчитать разницу двух дат в миллисекундах, перевести в сутки:
   function daysTill(ddmmyyyy) {
      let dd,
         mm,
         yyyy;
      [dd, mm, yyyy] = ddmmyyyy.split('.');
      const Till = new Date(yyyy, mm - 1, dd);
      return Math.floor((Till - date) / 864e5);
   }
   newDiv3.innerHTML = 'До нового года осталось: ' + daysTill("01.01.2020") + ' дня(ей));';
   document.body.insertBefore(newDiv3, script);
});