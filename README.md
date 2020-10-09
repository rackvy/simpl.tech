# simpl.tech
Simpl Platform – удобная платформа для создания интернет-магазина


Заопмнить 
Отменить все миграции:  npx sequelize db:migrate:undo:all
Переименуйте изменения, сохраненные в db. npx sequelize db:migrate

npx sequelize-cli model:generate --name Banner --attributes alt:string,user_id:integer,src:string,link:string