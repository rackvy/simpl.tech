(function () {
    'use strict'

    function cislo(){
      if (event.keyCode < 48 || event.keyCode > 57)
      event.returnValue= false;
    }

    

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
    var selectorWA = document.getElementById("validation-wa");
    var selectorT = document.getElementById("validation-telegram");
    var im = new Inputmask("+7 (999) 999-99-99");

    if(selector != null){
      im.mask(selector);
    }
    if(selectorWA != null){
      im.mask(selectorWA);
    }
    if(selectorT != null){
      im.mask(selectorT);
    }

    var file = document.getElementById("customFile");
    if(file != null){
      file.onchange = function(){
        if(file.files.length > 0)
        {
            document.getElementById('js-custom-file-label').innerHTML = file.files[0].name;
        }
      };
    }

    var file2 = document.getElementById("picture");
    if(file2 != null){
      file2.onchange = function(){
        if(file2.files.length > 0)
        {
            document.getElementById('js-file-picture-text').innerHTML = file2.files[0].name;
        }
        if(file2.files[0].size > 307200){
          alert("Файл слишком большой. Ограничение на фото 512Кб.");
          file2.value = "";
          document.getElementById('js-file-picture-text').innerHTML = 'Основное изображение';
       }
      };
    }

    var files = document.getElementById("pictures");
    if(files != null){
      files.onchange = function(){
        if(files.files.length > 0)
        {
            document.getElementById('js-file-pictures-text').innerHTML = 'Выбрано файлов ' + files.files.length;
        }
      };
    }

    var selectTarif = document.getElementById('js-select-tarif');
    if(selectTarif != null){
      selectTarif.onchange = function(){
        var value = selectTarif.options[selectTarif.selectedIndex].value;
        var els = document.getElementsByClassName('js-tarif-hide');
        Array.prototype.forEach.call(els, function(el) {
          el.style.display = 'none';
        });
        document.getElementById('js-card-'+value).style.display = 'block';
      }
    }

    var urlForQR = document.getElementById('js-url');
    if(urlForQR != null){
      new QRCode(document.getElementById("js-qrcode"), urlForQR.value);
    }

    var buttonAddNewAdress = document.getElementById('js-add-new-adress');
    if(buttonAddNewAdress != null){
      buttonAddNewAdress.addEventListener( "click" , () => {
        let i = document.getElementById('js-add-adress').dataset.i;
        i++;
        document.getElementById('js-add-adress').dataset.i = i;
        let templete = document.createElement('div');
        templete.innerHTML = 
        '<div class="mb-3">'+
            '<label for="adress'+i+'" class="form-label">Адрес магазина</label>'+
            '<input type="text" class="form-control" name="shops['+i+'][adress]" id="adress'+i+'" placeholder="">'+
        '</div>'+
        '<div class="mb-3">'+
            '<label for="desc'+i+'" class="form-label">Описание магазина</label>'+
            '<textarea class="form-control" id="desc'+i+'" name="shops['+i+'][desc]" rows="3"></textarea>'+
        '</div>';

        document.getElementById('js-add-adress').append(templete);
        
      });
    }
    
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
  

    var buttonNewProp1 = document.getElementById('js-addprop0');
    if(buttonNewProp1 != null){
      buttonNewProp1.addEventListener( "click" , () => {
        let i = document.getElementById('js-div-prop0').dataset.cp;
        i++;
        document.getElementById('js-div-prop0').dataset.cp = i;
        let templete = document.createElement('div');
        templete.innerHTML = 
        '<div class="mb-2">'+
        '<input type="text" class="form-control" id="prop[0][val]" name="prop[0][val][]" >'+
        '</div>';

        document.getElementById('js-div-prop0').append(templete);
      })
    }


    var buttonNewProp2 = document.getElementById('js-addprop1');
    if(buttonNewProp2 != null){
      buttonNewProp2.addEventListener( "click" , () => {
        let i = document.getElementById('js-div-prop1').dataset.cp;
        i++;
        document.getElementById('js-div-prop1').dataset.cp = i;
        let templete = document.createElement('div');
        templete.innerHTML = 
        '<div class="mb-2">'+
        '<input type="text" class="form-control" id="prop[1][val]" name="prop[1][val][]" >'+
        '</div>';

        document.getElementById('js-div-prop1').append(templete);
      })
    }


    var buttonNewProp3 = document.getElementById('js-addprop2');
    if(buttonNewProp3 != null){
      buttonNewProp3.addEventListener( "click" , () => {
        let i = document.getElementById('js-div-prop2').dataset.cp;
        i++;
        document.getElementById('js-div-prop2').dataset.cp = i;
        let templete = document.createElement('div');
        templete.innerHTML = 
        '<div class="mb-2">'+
        '<input type="text" class="form-control" id="prop[2][val]" name="prop[2][val][]" >'+
        '</div>';

        document.getElementById('js-div-prop2').append(templete);
      })
    }

    var buttonNewProp4 = document.getElementById('js-addprop3');
    if(buttonNewProp4 != null){
      buttonNewProp4.addEventListener( "click" , () => {
        let i = document.getElementById('js-div-prop3').dataset.cp;
        i++;
        document.getElementById('js-div-prop3').dataset.cp = i;
        let templete = document.createElement('div');
        templete.innerHTML = 
        '<div class="mb-2">'+
        '<input type="text" class="form-control" id="prop[3][val]" name="prop[3][val][]" >'+
        '</div>';

        document.getElementById('js-div-prop3').append(templete);
      })
    }



    var buttonDeletePicture = document.getElementById('js-deletePicture');
    if(buttonDeletePicture != null){
      buttonDeletePicture.addEventListener( "click" , () => {
        document.getElementById('js-divForNewPicture').innerHTML = "";
        let templete = document.createElement('div');
        templete.innerHTML = 
        '<input type="file" class="form-file-input" id="picture" name="file" accept="image/*" value="" required>'+
        '<label class="form-file-label" for="picture">'+
            '<span class="form-file-text" id="js-file-picture-text">Выбрать другое основное изображение</span>'+
            '<span class="form-file-button">Выбрать</span>'+
        '</label>';

        document.getElementById('js-divForNewPicture').append(templete);

      });
    }

    var selectStatus = document.getElementById('js-selectStatus');
    if(selectStatus != null){
      selectStatus.addEventListener( "change" , () => {
        
        const status = selectStatus.value;
        const shop_id = document.getElementById('js-shopid').value;
        const order_id = document.getElementById('js-orderid').value;
        const csrf = document.getElementById('js-csrf').value;


        const request = new XMLHttpRequest();
        const url = "/panel/change_status";
        const params = "newstatus=" +status+ "&shop_id=" + shop_id + "&order=" + order_id + "&_csrf=" + csrf;

        request.open("POST", url, true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        request.addEventListener("readystatechange", () => {
          if(request.readyState === 4 && request.status === 200) {       
          console.log(request.responseText);
          }
        });
        request.send(params);
        

        return false;
      });
    }
    
    
})()