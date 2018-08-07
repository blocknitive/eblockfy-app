FROM ubuntu:16.04

RUN apt-get update && apt-get install -y git
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN npm install -g http-server
RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN git clone https://github.com/jdiegosierra/eblockfy-app.git

WORKDIR ./eblockfy-app

CMD ["http-server", "-s"] 