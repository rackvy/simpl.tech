(function () {
    'use strict'

    const pageBasket = document.getElementById('page-basket');
    if(pageBasket != null){
      document.querySelectorAll('.js-minus').forEach(node => {
        node.addEventListener('click', function() {
          let id = node.dataset.id;
          let count = document.getElementById('js-countBasket'+id).value;
          const blockPrice = document.getElementById('js-item-basket-'+id);
          let price = blockPrice.dataset.price;
          let allSumm = document.getElementById('js-summ').dataset.summ;
          if(count == 1){
            return false;
          }
          count--;
          
          blockPrice.textContent = price * count;

          document.getElementById('js-countBasket'+id).value = count;
          blockPrice.dataset.count = count;
          blockPrice.textContent = new Intl.NumberFormat('ru-RU', {
            currency: 'rub',
            style: 'currency'
          }).format(blockPrice.textContent)

          allSumm = allSumm - price;
          document.getElementById('js-summ').dataset.summ = allSumm;
          document.getElementById('js-summ').textContent = allSumm;
          document.getElementById('js-summ').textContent = new Intl.NumberFormat('ru-RU', {
            currency: 'rub',
            style: 'currency'
          }).format(document.getElementById('js-summ').textContent);



          const request = new XMLHttpRequest();
          const csrf = document.getElementById('js-csrf').value;
          const shop = document.getElementById('js-shop').value;
          const url = "/"+shop+"/basket/count_item";

          const params = "id=" + id+ "&count=" + count + "&_csrf=" + csrf;

          request.open("POST", url, true);
          request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

          request.addEventListener("readystatechange", () => {
            if(request.readyState === 4 && request.status === 200) {       
            console.log(request.responseText);
            }
          });
          request.send(params);
        })
      });
      document.querySelectorAll('.js-plus').forEach(node => {
        node.addEventListener('click', function() {
          let id = node.dataset.id;
          let count = document.getElementById('js-countBasket'+id).value;
          const blockPrice = document.getElementById('js-item-basket-'+id);
          let price = blockPrice.dataset.price;
          let allSumm = document.getElementById('js-summ').dataset.summ;
          count++;
          
          blockPrice.textContent = price * count;

          document.getElementById('js-countBasket'+id).value = count;
          blockPrice.dataset.count = count;
          blockPrice.textContent = new Intl.NumberFormat('ru-RU', {
            currency: 'rub',
            style: 'currency'
          }).format(blockPrice.textContent)

          allSumm = Number(allSumm) + Number(price);
          document.getElementById('js-summ').dataset.summ = allSumm;
          document.getElementById('js-summ').textContent = allSumm;
          document.getElementById('js-summ').textContent = new Intl.NumberFormat('ru-RU', {
            currency: 'rub',
            style: 'currency'
          }).format(document.getElementById('js-summ').textContent)       
          
          const request = new XMLHttpRequest();
          const csrf = document.getElementById('js-csrf').value;
          const shop = document.getElementById('js-shop').value;
          const url = "/"+shop+"/basket/count_item";

          const params = "id=" + id+ "&count=" + count + "&_csrf=" + csrf;

          request.open("POST", url, true);
          request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

          request.addEventListener("readystatechange", () => {
            if(request.readyState === 4 && request.status === 200) {       
            console.log(request.responseText);
            }
          });
          request.send(params);


        })
      });
    }

    function hidePopupAddBasketSuccess(){
      document.getElementById('addToBasket-success').style.display = "none";
    }

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
      
      var selector2 = document.getElementById("phone");
      
      if(selector2 != null){
        var im2 = new Inputmask("+7 (999) 999-99-99");
        im2.mask(selector2);  
      }     
      
      
    var allButtonsAddCart = document.querySelectorAll('.js-btn-add-cart');
    if(allButtonsAddCart.length > 0){
      for (var i = 0; i < allButtonsAddCart.length; i++) {
        allButtonsAddCart[i].addEventListener('click', function() {
          let item_id = this.dataset.id;
          let name = this.dataset.name;
          let price = this.dataset.price;
          let shop = this.dataset.shop;
          let csrf = this.dataset.csrf;

          console.log(item_id + name + price + shop);

          const request = new XMLHttpRequest();
          const url = "/"+shop+"/add_to_basket";
          const params = "item_id=" + item_id+ "&name=" + name + "&price=" + price + "&_csrf=" + csrf;

          request.open("POST", url, true);
          request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

          request.addEventListener("readystatechange", () => {
            if(request.readyState === 4 && request.status === 200) {       
            console.log(request.responseText);
            }
          });
          request.send(params);
          document.getElementById('addToBasket-success').style.display = "block";
          setTimeout(hidePopupAddBasketSuccess, 3000);

          let countBasket = document.getElementById('js-count-header-basket').dataset.count;
          countBasket++;
          document.getElementById('js-count-header-basket').dataset.count = countBasket;
          document.getElementById('js-count-header-basket').textContent = countBasket;
          document.getElementById('js-xs-count-header-basket').textContent = countBasket;

          return false;
        });
      }
    }


    var showProps = document.getElementById('js-showAllProps');
    if(showProps != null){
      showProps.addEventListener( "click" , () => {
        document.querySelectorAll('.xs-prop').forEach(node => {
          var style = window.getComputedStyle(node);
          if(style.display === 'none'){
            node.style.display = "block";
          }else{
            node.style.display = "none";
          }
          
        })
        
      });
    }

//js-siema
  var banner = document.getElementById('js-siema');
  if(banner != null){
    const mysiema = new Siema({
      selector: '#js-siema',
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
  }


  const pageNewOrder = document.getElementById('page-new-order');
  if(pageNewOrder != null){
    document.querySelectorAll('.js-radio-delivery').forEach(node => {
      node.addEventListener( "click" , () => {
        if(node.checked && node.value == 'delivery'){
          document.getElementById('js-adress').style.display = 'block';
        }else{
          document.getElementById('js-adress').style.display = 'none';
        }
      });
    });
  }
  

})()