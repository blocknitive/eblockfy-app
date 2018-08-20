#!/bin/bash
# -*- ENCODING: UTF-8 -*-

docker pull jdiegosierra/eblockfy-app:latest
docker run -d --name eblockfy -h eblockfy -p $0:80 -v $1:/usr/share/nginx/html/images:ro -v $1:/usr/share/nginx/html/css:ro jdiegosierra/eblockfy-app:latest 


