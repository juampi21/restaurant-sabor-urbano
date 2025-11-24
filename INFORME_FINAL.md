# Sabor Urbano - Backend Walkthrough (Entrega Final)

I have successfully upgraded the application for the Final Delivery, migrating to MongoDB Atlas and implementing Authentication with Role-Based Access Control.

## Key Changes (Final Delivery)

### 1. Database Migration (MongoDB Atlas)
- **Mongoose**: Replaced JSON file logic with Mongoose Schemas.
- **Connection**: App now connects to your MongoDB Atlas cluster.
- **Schemas**: Defined strict schemas for `User`, `Employee`, `Task`, `Order`, and `Supply`.

### 2. Authentication & Security
- **Registration/Login**: Users can register and login securely.
- **Password Hashing**: Passwords are hashed using `bcryptjs`.
- **Session Management**: Uses JWT (JSON Web Tokens) stored in HTTP-Only cookies.
- **Protected Routes**: Middleware prevents unauthorized access to internal pages.
- **Role-Based Access Control (RBAC)**:
    - **Admin**: Can manage Employees and Delete Orders/Inventory.
    - **Employee**: Can Create/View Orders and Inventory, but cannot Delete them.

### 3. Deployment Ready
- **Environment Variables**: Sensitive data (DB URI, Secrets) moved to `.env`.
- **Documentation**: Added `README.md` with setup and deployment instructions.

## Verification

I have verified the following flows:
1.  **Auth**: Register a new user -> Login -> Access Dashboard -> Logout.
2.  **CRUD**: Create/Read/Update/Delete operations for Employees, Tasks, Inventory, and Orders using MongoDB.
3.  **Protection**: Verified that accessing `/tasks` without login redirects to `/auth/login`.
4.  **Permissions**: Verified that non-admin users cannot see "Delete" buttons or access delete routes.

## How to Run

1.  **Start the server**:
    ```bash
    npm run dev
    ```
2.  **Access the application**:
    Open [http://localhost:3000](http://localhost:3000).
3.  **First Step**: Go to "Registrarse" to create your first user.

## Deployment
Follow the instructions in `README.md` to deploy to Render.com.
