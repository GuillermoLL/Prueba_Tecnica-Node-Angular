FROM node:18.17.0-alpine3.18

# Instalacion dependencias
RUN apk update
RUN apk upgrade

#############################################################
# APP  ######################################################
#############################################################

# Construir aplicacion
RUN mkdir /node-app
COPY . /node-app

WORKDIR /node-app
RUN npm install

#############################################################
# FINAl #####################################################
#############################################################

# Port
EXPOSE 8080

# Lanzar app
CMD [ "npm", "run", "init" ]