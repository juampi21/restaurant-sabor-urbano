# Sabor Urbano - Backend (Entrega Final)

Sistema de gestión integral para el restaurante "Sabor Urbano", desarrollado con Node.js, Express y MongoDB.

## Características

- **Gestión de Empleados**: Alta, baja y modificación de personal con roles y áreas.
- **Gestión de Tareas**: Asignación de tareas, estados y prioridades.
- **Inventario**: Control de stock de insumos.
- **Pedidos**: Registro y seguimiento de pedidos (Delivery/Local).
- **Autenticación**: Sistema de Login/Registro seguro con JWT y Cookies.
- **Base de Datos**: MongoDB Atlas (Nube).

## Tecnologías Utilizadas

- **Backend**: Node.js, Express.
- **Base de Datos**: MongoDB, Mongoose.
- **Vistas**: Pug (Server-Side Rendering).
- **Autenticación**: JWT, Bcryptjs, Cookie-Parser.
- **Herramientas**: Nodemon, Dotenv, Morgan.

## Instalación y Ejecución

1.  **Clonar el repositorio**:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd sabor-urbano
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno**:
    Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
    ```env
    PORT=3000
    MONGODB_URI=<TU_CONEXION_MONGODB_ATLAS>
    JWT_SECRET=tu_secreto_super_seguro
    ```

4.  **Iniciar el servidor**:
    ```bash
    npm run dev
    ```

5.  **Acceder a la aplicación**:
    Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Despliegue (Render.com)

1.  Sube tu código a GitHub.
2.  Crea un "Web Service" en Render.
3.  Conecta tu repositorio.
4.  Configura las variables de entorno (`MONGODB_URI`, `JWT_SECRET`) en el panel de Render.
5.  Comando de Build: `npm install`
6.  Comando de Start: `npm start`

## Autores
- [Tu Nombre / Grupo]
