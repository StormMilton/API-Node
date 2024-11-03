# Proyecto de Gestión de Propiedades

Este proyecto es una aplicación de gestión de propiedades que permite realizar operaciones de venta y alquiler de propiedades. El sistema cuenta con una API REST para el backend desarrollada en Node.js y un frontend en React para la interacción del usuario. La aplicación está diseñada para administradores, agentes y clientes, cada uno con diferentes permisos y funciones.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Características](#características)
- [Rutas de la API](#rutas-de-la-api)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [Configuración de Variables de Entorno](#configuración-de-variables-de-entorno)
- [Configuración de Repositorios](#configuración-de-repositorios)
- [Contribuciones](#contribuciones)

## Instalación

### Backend

1. Clona este repositorio:

   ```bash
   git clone https://github.com/StormMilton/API-Node.git
   cd API-Node

2. Instala las dependencias:

    ```bash
    npm install

3. Crea la base de datos necesaria y configura las variables de entorno en un archivo .env siguiendo el ejemplo de Configuración de Variables de Entorno.

4. Ejecuta las migraciones para crear las tablas necesarias en la base de datos:

    ```bash
    npx sequelize-cli db:migrate

5. Inicia el servidor: 

    ```bash
    npm start

6. El servidor estará funcionando en http://localhost:3307.

## Características

Autenticación de Usuarios: Soporta autenticación con JWT para seguridad y control de acceso.
Roles de Usuarios: Diferentes permisos para clientes, agentes y administradores.
Gestión de Propiedades: Operaciones CRUD sobre propiedades, control de estado de propiedad (disponible, alquilada, vendida).
Gestión de Clientes: CRUD para clientes asociados a las propiedades.
Control de Alquileres y Ventas: Registro y gestión de transacciones de alquiler y venta, actualizando automáticamente el estado de la propiedad.

## Rutas de la API

# Autenticación de Usuarios
- POST /api/users/register - Registro de nuevos usuarios.
- POST /api/users/login - Inicio de sesión de usuarios.
- GET /api/users/profile - Obtención del perfil del usuario autenticado.

# Gestión de Propiedades
- GET /api/properties - Obtener todas las propiedades disponibles (clientes solo ven las disponibles).
- POST /api/properties - Registrar una nueva propiedad (solo para admin y agentes).
- PUT /api/properties/ - Actualizar la información de una propiedad (solo para admin y agentes).
- DELETE /api/properties/ - Eliminar una propiedad (solo para admin).

# Gestión de Clientes
- GET /api/clients - Obtener la lista de todos los clientes (solo admin y agentes).
- POST /api/clients - Registrar un nuevo cliente.
- PUT /api/clients/ - Actualizar un cliente (solo admin y agentes).
- DELETE /api/clients/ - Eliminar un cliente (solo admin).

# Control de Alquileres
- GET /api/rentals - Obtener todos los alquileres.
- POST /api/rentals - Registrar un nuevo alquiler (verifica disponibilidad de la propiedad).
- DELETE /api/rentals/ - Eliminar un alquiler (solo admin).

# Control de Ventas
- GET /api/sales - Obtener todas las ventas.
- POST /api/sales - Registrar una nueva venta (verifica disponibilidad de la propiedad).
- DELETE /api/sales/ - Eliminar una venta (solo admin).

## Ejemplos de Uso

## Autenticación de Usuarios
# POST /api/users/register - Registro de nuevos usuarios
Ejemplo de solicitud:
    POST /api/users/register

```json
{
    "name": "María Gómez",
    "email": "maria.gomez@example.com",
    "password": "password123",
    "role": "cliente"
}
```

Respuesta exitosa:

```json
{
    "message": "Usuario registrado exitosamente",
    "user": {
        "id": 1,
        "name": "María Gómez",
        "email": "maria.gomez@example.com",
        "role": "cliente"
    }
}
```

# POST /api/users/login - Inicio de sesión de usuarios
Ejemplo de solicitud:
    POST /api/users/login

```json
{
    "email": "maria.gomez@example.com",
    "password": "password123"
}
```
    
Respuesta exitosa:

```json
{
    "message": "Inicio de sesión exitoso",
    "token": "jwt_token_aqui",
    "user": {
        "id": 1,
        "name": "María Gómez",
        "email": "maria.gomez@example.com",
        "role": "cliente"
    }
}
```

# GET /api/users/profile - Obtención del perfil del usuario autenticado
Ejemplo de solicitud:
    Header: Authorization: Bearer jwt_token_aqui
    GET /api/users/profile

Respuesta exitosa:

```json
{
    "id": 1,
    "name": "María Gómez",
    "email": "maria.gomez@example.com",
    "role": "cliente"
}
```

## Gestión de Propiedades

# GET /api/properties - Obtener todas las propiedades disponibles
Ejemplo de solicitud:
    GET /api/properties

Respuesta exitosa:

```json
[
    {
        "id": 1,
        "address": "Calle Falsa 123",
        "type": "Casa",
        "price": 250000,
        "status": "disponible",
        "description": "Hermosa casa en el centro",
        "size": 120,
        "agentId": 2
    }
]
```

# POST /api/properties - Registrar una nueva propiedad
Ejemplo de solicitud:
    Header: Authorization: Bearer jwt_token_aqui
    POST /api/properties

```json
{
    "address": "Avenida Siempreviva 742",
    "type": "Departamento",
    "price": 150000,
    "status": "disponible",
    "description": "Departamento moderno",
    "size": 80,
    "agentId": 2
}
```

Respuesta exitosa:

```json
{
    "message": "Propiedad registrada exitosamente",
    "property": {
        "id": 2,
        "address": "Avenida Siempreviva 742",
        "type": "Departamento",
        "price": 150000,
        "status": "disponible",
        "description": "Departamento moderno",
        "size": 80,
        "agentId": 2
    }
}
```

# PUT /api/properties/ - Actualizar la información de una propiedad
Ejemplo de solicitud:
    Header: Authorization: Bearer jwt_token_aqui
    PUT /api/properties/1

```json
{
    "price": 230000,
    "status": "reservada"
}
```

Respuesta exitosa:

```json
{
    "message": "Propiedad actualizada exitosamente",
    "property": {
        "id": 1,
        "address": "Calle Falsa 123",
        "type": "Casa",
        "price": 230000,
        "status": "reservada",
        "description": "Hermosa casa en el centro",
        "size": 120,
        "agentId": 2
    }
}
```

# DELETE /api/properties/ - Eliminar una propiedad
Ejemplo de solicitud:
    Header: Authorization: Bearer jwt_token_aqui
    DELETE /api/properties/2

Respuesta exitosa:

```json
{
    "message": "Propiedad eliminada exitosamente"
}
```

## Gestión de Clientes
# GET /api/clients - Obtener la lista de todos los clientes
Ejemplo de solicitud:
    Header: Authorization: Bearer jwt_token_aqui
    GET /api/clients

Respuesta exitosa:

```json
[
    {
        "id": 1,
        "name": "Carlos García",
        "documentId": "DNI 12345678",
        "phone": "123456789",
        "userId": 1
    },
]
```

# POST /api/clients - Registrar un nuevo cliente
Ejemplo de solicitud:
    Header: Authorization: Bearer jwt_token_aqui
    POST /api/clients

```json
{
    "name": "Carlos García",
    "documentId": "DNI 12345678",
    "phone": "123456789",
    "userId": 1
}
```

Respuesta exitosa:

```json
{
    "message": "Cliente registrado exitosamente",
    "client": {
        "id": 2,
        "name": "Carlos García",
        "documentId": "DNI 12345678",
        "phone": "123456789",
        "userId": 1
    }
}
```

## Control de Alquileres
# GET /api/rentals - Obtener todos los alquileres
Ejemplo de solicitud:
    GET /api/rentals

Respuesta exitosa:

```json
[
    {
        "id": 1,
        "rentalDate": "2024-12-01",
        "returnDate": "2025-01-01",
        "totalAmount": 1500,
        "propertyId": 1,
        "clientId": 1
    },
]
```

# POST /api/rentals - Registrar un nuevo alquiler
Ejemplo de solicitud:
    Header: Authorization: Bearer jwt_token_aqui
    POST /api/rentals

```json
{
    "rentalDate": "2024-12-01",
    "returnDate": "2025-01-01",
    "totalAmount": 1500,
    "propertyId": 1,
    "clientId": 1
}
```

Respuesta exitosa:

```json
{
    "message": "Alquiler registrado exitosamente",
    "rental": {
        "id": 1,
        "rentalDate": "2024-12-01",
        "returnDate": "2025-01-01",
        "totalAmount": 1500,
        "propertyId": 1,
        "clientId": 1
    }
}
```

## Control de Ventas
# GET /api/sales - Obtener todas las ventas
Ejemplo de solicitud:
    GET /api/sales

Respuesta exitosa:

```json
[
    {
        "id": 1,
        "propertyId": 1,
        "clientId": 2,
        "salePrice": 150000,
        "saleDate": "2024-12-01"
    },
]
```

# POST /api/sales - Registrar una nueva venta
Ejemplo de solicitud:
    Header: Authorization: Bearer jwt_token_aqui
    POST /api/sales

```json
{
    "propertyId": 1,
    "clientId": 2,
    "salePrice": 150000,
    "saleDate": "2024-12-01"
}
```

Respuesta exitosa:

```json
{
    "message": "Venta registrada exitosamente",
    "sale": {
        "id": 1,
        "propertyId": 1,
        "clientId": 2,
        "salePrice": 150000,
        "saleDate": "2024-12-01"
    }
}
```

## Configuración de Variables de Entorno

# Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables:

```env
# Configuración de la base de datos
DB_HOST=localhost
DB_USER=root
DB_PASS=root
DB_NAME=nombre_base_de_datos

# Configuración del puerto del servidor
PORT=3307

# Clave secreta para JWT
JWT_SECRET=tu_clave_secreta    
```

## Configuración de Repositorios

1. Repositorio del Backend:
    Ubicado en https://github.com/tuusuario/nombre-del-repo-backend.
    Contiene toda la API REST, configuración de base de datos y autenticación.
2. Repositorio del Frontend:
    Ubicado en https://github.com/tuusuario/nombre-del-repo-frontend.
    Incluye la interfaz de usuario en React y el consumo de la API.
3. Integración:
    En el frontend, configura las peticiones HTTP para apuntar al backend desplegado o local (http://localhost:3307/api).

## Contribuciones

Si deseas contribuir a este proyecto, por favor:
1. Realiza un fork del repositorio.
2. Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
3. Realiza tus cambios y commitea (git commit -m 'Agregar nueva funcionalidad').
4. Haz push a la rama (git push origin feature/nueva-funcionalidad).
5. Abre un Pull Request.