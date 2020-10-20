# simpl.tech
Simpl Platform – удобная платформа для создания интернет-магазина


Заопмнить 
Отменить все миграции:  npx sequelize db:migrate:undo:all
Переименуйте изменения, сохраненные в db. npx sequelize db:migrate

npx sequelize-cli model:generate --name Basket --attributes ssid:string,shop_id:integer,item_id:integer,name:string,price:integer,count:integer

npx sequelize-cli model:generate --name Order --attributes shop_id:integer,name:string,email:string,phone:string,pay:string,delivery:string,adress:text,comment:text,items:json