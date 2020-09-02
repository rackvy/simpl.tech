(function () {
    'use strict'


    function clock() {
      var d = new Date();
      var month_num = d.getMonth()
      var day = d.getDate();
      var hours = d.getHours();
      var minutes = d.getMinutes();
      var seconds = d.getSeconds();
       
      var month = ["января", "февраля", "марта", "апреля", "мая", "июня","июля", "августа", "сентября", "октября", "ноября", "декабря"];
       
      if (day <= 9) day = "0" + day;
      if (hours <= 9) hours = "0" + hours;
      if (minutes <= 9) minutes = "0" + minutes;
      if (seconds <= 9) seconds = "0" + seconds;
       
       var date_time = "" + day + " " + month[month_num] + " " + d.getFullYear() +
      " г.&nbsp;"+ hours + ":" + minutes + ":" + seconds;
      if (document.layers) {
       document.layers.doc_time.document.write(date_time);
       document.layers.doc_time.document.close();
      }
      else document.getElementById("time-now").innerHTML = date_time;
       setTimeout(clock, 1000);
    }
    clock();
  
      document.querySelectorAll('.js-price').forEach(node => {
        node.textContent = new Intl.NumberFormat('ru-RU', {
          currency: 'rub',
          style: 'currency'
        }).format(node.textContent)
      })

      var selector = document.getElementById("inputPhone");
      var im = new Inputmask("+7 (999) 999-99-99");
      if(selector != null){
        im.mask(selector);
      }
      




})()