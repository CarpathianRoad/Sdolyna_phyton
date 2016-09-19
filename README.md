## 1. Установка:  
0. Ставим Docker с официального сайта https://www.docker.com/products/docker#/windows
1. Win+R, cmd   
2. Переходим в папку с проектом(там где лежит Dockerfile) через команду ```cd C:\ПУТЬ К ПРОЕКТУ\```   
3. ```docker build -t apidolyna .```   
	
## 2. Включение:   
1. ```docker run -d -t --name sdolyna -p 80:80 -v <ПУТЬ К ПРОЕКТУ/app>:/app apidolyna```   
Пример *docker run -d -t --name sdolyna -p 80:80 -v G:/FlaskDocker/app:/app apidolyna*
2. После этого сайт будет доступен по адресу **http://localhost/** или **http://127.0.0.1/**
   
## 3. Перезагрузить Python:   
1. ```docker exec sdolyna touch ../reload```   
После этого перезагрузится UWSGI и изменения Python скриптов вступят в силу   
----   
Для статичных файлов перезагружать ничего не нужно   

## 4. Выключение и удаление:
*Это пункт для справки - не надо каждый раз удалять контейнер*
1. Выключить ```docker stop sdolyna```   
2. Удалить ```docker rm sdolyna```   
