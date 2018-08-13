# Para ejecutar la aplicación:

    # Instalar Docker:
    https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce-1

    # Descargar eblockfy:
    docker pull jdiegosierra/eblockfy-app:latest

    # Lanzarlo:
    docker run -d --name eblockfy-server -h eblockfy-server -p 80:80 jdiegosierra/eblockfy-app:latest

    # En el navegador: 
    localhost/index.html

    # Parar eblockfy:
    docker stop eblockfy-server

    # Volver a iniciar eblockfy:
    docker start eblockfy-server 