FROM ubuntu:16.04

RUN apt-get update
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN npm install -g http-server
RUN ln -s /usr/bin/nodejs /usr/bin/node

COPY . /home/eblockfy

WORKDIR /home/eblockfy

CMD ["http-server", "-s"] 