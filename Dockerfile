FROM nginx

RUN apt-get update
RUN apt-get install -y git
RUN git clone https://github.com/jdiegosierra/eblockfy-app
RUN mv eblockfy-app/* /usr/share/nginx/html

VOLUME /home/diego/devs/eblockfy-app/imagesdocker:/usr/share/nginx/html/images
VOLUME /home/diego/devs/eblockfy-app/cssdocker:/usr/share/nginx/html/css
