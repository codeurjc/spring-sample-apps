# web-db-security example

This is a basic web project implemented with SpringBoot. It uses the following features:
* Mustache: a web template sytem using database and security.
* Database: Based on SpringData, JPA and MySQL
* Security: Https support, users with different roles, URLs authorization based on roles and XSRF

## Environment requirements

* Java 8 (it could work with newer versions, but not tested)
* MySQL Server:
  * Accesible in localhost and 3306 port (default one).
  * Schema 'books' created
  * Root user with password 'pass'
  * You can start dockerized MySQL with the following command:

```
$ docker run --rm --name mysql -e MYSQL_ROOT_PASSWORD=pass -e MYSQL_DATABASE=books mysql:5.7
```
