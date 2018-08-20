#!/bin/bash
# -*- ENCODING: UTF-8 -*- 

docker stop eblockfy
docker rm eblockfy
docker rmi jdiegosierra/eblockfy-app
docker run -d --name eblockfy -h eblockfy -p $1:80 -v $2/images:/usr/share/nginx/html/images:ro  -v $2/css:/usr/share/nginx/html/css:ro jdiegosierra/eblockfy-app:latest 


