# Webserver + RestServer + MySQL + TypeScript

# Aplicación del Café

Recuerden que deben de ejecutar ```npm install``` para reconstruir los módulos de Node y que es necesario crear una base de datos MySQl. 

Comando para levantar instancia de MySQL en Docker:

docker run --name mysql \
  -e ALLOW_EMPTY_PASSWORD=yes \
  -e MYSQL_USER=test \
  -e MYSQL_PASSWORD=test \
  -e MYSQL_DATABASE=cafeDB \
  -e MYSQL_AUTHENTICATION_PLUGIN=mysql_native_password \
  -e MYSQL_ROOT_PASSWORD=root \
  -p 3306:3306 \
  mysql:latest