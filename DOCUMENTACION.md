# Documentación del Sistema - Sabor Urbano

## 1. Explicación del Funcionamiento

El sistema "Sabor Urbano" es una aplicación web Backend diseñada para gestionar la operatividad de un restaurante con servicio de delivery. Está construida sobre una arquitectura **MVC (Modelo-Vista-Controlador)** utilizando **Node.js** y **Express**, con persistencia de datos en **MongoDB Atlas**.

### Módulos Principales:

*   **Autenticación (Auth):**
    *   Gestiona el acceso seguro al sistema.
    *   Utiliza **JWT (JSON Web Tokens)** almacenados en cookies HTTP-Only para mantener la sesión.
    *   Implementa **Hashing de contraseñas** con `bcryptjs` para seguridad.
    *   Define dos roles: `admin` (acceso total) y `employee` (acceso operativo).

*   **Empleados (Employees):**
    *   Permite registrar y administrar el personal del restaurante.
    *   Almacena datos como nombre, rol (cocinero, mozo, etc.) y área de trabajo.
    *   *Restricción:* Solo los administradores pueden crear, editar o eliminar empleados.

*   **Tareas (Tasks):**
    *   Sistema de asignación de trabajo.
    *   Permite crear tareas, asignar prioridades (Alta, Media, Baja) y estados (Pendiente, En Proceso, Finalizada).
    *   Las tareas se asignan a empleados específicos registrados en el sistema.

*   **Pedidos (Orders):**
    *   Módulo central para la operación del restaurante.
    *   Registra pedidos provenientes de múltiples fuentes (Local, Rappi, PedidosYa).
    *   Calcula totales y sigue el estado del pedido.
    *   *Seguridad:* Los empleados pueden cargar pedidos, pero solo los administradores pueden eliminarlos.

*   **Inventario (Inventory):**
    *   Control de stock de insumos críticos.
    *   Permite agregar y visualizar ingredientes con sus cantidades y unidades.
    *   *Seguridad:* Al igual que los pedidos, solo los administradores pueden dar de baja insumos.

---

## 2. Diagramas del Sistema

### A. Diagrama de Clases (Modelo de Datos)

Representa las entidades almacenadas en MongoDB y sus relaciones.

```mermaid
classDiagram
    class User {
        +ObjectId _id
        +String username
        +String password
        +String role
        +Date createdAt
        +comparePassword()
    }

    class Employee {
        +ObjectId _id
        +String name
        +String role
        +String area
        +Date createdAt
    }

    class Task {
        +ObjectId _id
        +String description
        +String priority
        +String state
        +ObjectId assignedTo
        +String observations
        +Date createdAt
    }

    class Order {
        +ObjectId _id
        +String clientName
        +String platform
        +String products
        +Number total
        +String status
        +Date createdAt
    }

    class Supply {
        +ObjectId _id
        +String name
        +Number quantity
        +String unit
        +Date createdAt
    }

    Employee "1" -- "0..*" Task : assignedTo
```

### B. Diagrama de Casos de Uso

Muestra qué acciones puede realizar cada tipo de usuario (Admin vs Empleado).

```mermaid
flowchart LR
    Admin((Administrador))
    Emp((Empleado))

    subgraph Sistema Sabor Urbano
        Login[Iniciar Sesión]
        ViewDash[Ver Tableros]
        
        CreateOrder[Crear Pedido]
        CreateSupply[Cargar Insumo]
        
        ManageEmp[Gestionar Empleados]
        DeleteOrder[Eliminar Pedido]
        DeleteSupply[Eliminar Insumo]
    end

    Emp --> Login
    Emp --> ViewDash
    Emp --> CreateOrder
    Emp --> CreateSupply

    Admin --> Login
    Admin --> ViewDash
    Admin --> CreateOrder
    Admin --> CreateSupply
    Admin --> ManageEmp
    Admin --> DeleteOrder
    Admin --> DeleteSupply
```

### C. Diagrama de Secuencia (Creación de un Pedido)

Muestra el flujo de datos desde que el usuario envía el formulario hasta que se guarda en la base de datos.

```mermaid
sequenceDiagram
    participant User as Usuario (Navegador)
    participant Route as OrderRoutes
    participant Auth as AuthMiddleware
    participant Controller as OrderController
    participant Model as OrderModel (Mongoose)
    participant DB as MongoDB Atlas

    User->>Route: POST /orders (Datos del Pedido)
    Route->>Auth: protect()
    
    alt Token Inválido
        Auth-->>User: Redirect /auth/login
    else Token Válido
        Auth->>Controller: next()
        Controller->>Model: create(req.body)
        Model->>DB: insertOne(document)
        DB-->>Model: Success
        Model-->>Controller: Order Object
        Controller-->>User: Redirect /orders (Lista Actualizada)
    end
```
