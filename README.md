# Angular Node

Este proyecto esta utilizando la version de Angular 17.3.8 y Node 18.17.0.

## Lanzar el proyecto

### Docker

En el repositorio vienen los archivos Dockerfile y el docker-compose.yml configurados.

Dirígete la carpeta donde clonaste el repositorio y ejecuta:
  
```console
docker-compose up
```

Se montara la imagen y el contenedor de la app.
Una vez que termine de instalar dirígete a <http://localhost:4200> para revisar la app.
  
### En local

Primero asegurate de que estas en la version de node 18.17.0.

Despues, dirigite a la carpeta de node-app e instala  las dependencias

```console
npm install
```

Y lanza el proyecto

```console
npm run init
```

Despues, dirigite a la carpeta de angular-app e instala las dependencias

```console
npm install
```

Y lanza el proyecto

```console
npm run start
```

## Descripción de la prueba

El objetivo de esta prueba, es desarrollar una pequeña aplicación web, usando Angular, y un API Rest, hecha con Node, que permita con un endpoint de tipo POST obtener el listado de usuarios.

### Requisitos

#### Angular:

- Por cada usuario se mostrará: nombre de usuario, nombre, apellido1, apellido2 y correo electrónico.
- Formulario de búsqueda que permitirá filtrar por: nombre, apellidos y correo electrónico.

#### Node:

- Un endpoint de tipo POST para obtener el listado de usuarios filtrado y con paginación.

### Librerias extra

#### Angular:

- Ts-standar: Para lintar el codigo y no tener errores al escribir.
- Tailwind: Para crear los diseños de interfaces.
- Postcss: Para poder instalar y configurar Tailwind en Angular.

#### Node:

- Express: Para hacer las peticiones http.
