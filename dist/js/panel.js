(function () {
    'use strict'
  
      document.querySelectorAll('.js-price').forEach(node => {
        node.textContent = new Intl.NumberFormat('ru-RU', {
          currency: 'rub',
          style: 'currency'
        }).format(node.textContent)
      })

      var selector = document.getElementById("inputPhone");
 
      var im = new Inputmask("+7 (999) 999-99-99");
      im.mask(selector);


})()