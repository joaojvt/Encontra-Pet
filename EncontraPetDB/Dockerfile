# Derivando da imagem oficial do MySQL
FROM mysql:8.0
# Adicionando os scripts SQL para serem executados na criação do banco
COPY ./encontrapet.sql /docker-entrypoint-initdb.d/

#sudo docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=Joao@123 -e MYSQL_DATABASE=ENCONTRAPET -e MYSQL_USER=joao -e MYSQL_PASSWORD=Joao@123 apiencontrapet-db

