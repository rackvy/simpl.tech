(function () {
    'use strict'
  
      document.querySelectorAll('.js-price').forEach(node => {
        node.textContent = new Intl.NumberFormat('ru-RU', {
          currency: 'rub',
          style: 'currency'
        }).format(node.textContent)
      })

      var selector = document.getElementById("inputPhone");
      
      if(selector != null){
        var im = new Inputmask("+7 (999) 999-99-99");
        im.mask(selector);  
      }     
      
      
      const mysiema = new Siema({
        selector: '.js-siema',
        duration: 200,
        easing: 'ease-out',
        perPage: 1,
        startIndex: 0,
        draggable: true,
        multipleDrag: true,
        threshold: 20,
        loop: true,
        rtl: false,
      });
      document.querySelector('.js-siema-prev').addEventListener('click', () => mysiema.prev());
      document.querySelector('.js-siema-next').addEventListener('click', () => mysiema.next());


})()