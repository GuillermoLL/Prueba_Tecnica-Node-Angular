FROM node:18.17.0-alpine3.18

# Instalacion dependencias
RUN apk update
RUN apk upgrade
RUN npm install -g @angular/cli@17.3.8

#############################################################
# APP  ######################################################
#############################################################

# Construir aplicacion
RUN mkdir /angular-app
COPY . /angular-app

WORKDIR /angular-app
RUN npm install --force
RUN find node_modules -path '*/needle/test/files/*' -delete

#############################################################
# FINAl #####################################################
#############################################################

# Port
EXPOSE 4200

# Lanzar app
CMD [ "npm", "run", "start" ]


