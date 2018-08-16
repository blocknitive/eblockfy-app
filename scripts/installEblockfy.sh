#!/bin/bash
# -*- ENCODING: UTF-8 -*-

docker pull jdiegosierra/eblockfy-app:latest
docker run -d --name eblockfy-server -h eblockfy-server -p 80:80 jdiegosierra/eblockfy-app:latest



