FROM nginx

RUN apt-get update
RUN apt-get install -y git
RUN git clone https://github.com/jdiegosierra/eblockfy-app.git
RUN mv eblockfy-app/* /usr/share/nginx/html

EXPOSE 80:80