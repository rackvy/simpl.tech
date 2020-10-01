# simpl.tech
Simpl Platform – удобная платформа для создания интернет-магазина


Заопмнить 
Отменить все миграции:  npx sequelize db:migrate:undo:all
Переименуйте изменения, сохраненные в db. npx sequelize db:migrate

npx sequelize-cli model:generate --name Category --attributes name:string,user_id:integer,parent_id:integer,description:text