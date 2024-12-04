Here's the updated README.md file that includes both the Frontend and Backend sections for your full-stack application:

# Full-Stack Authentication & User Management System

This is a **Full-Stack** application consisting of a **frontend** built with **Angular** and a **backend** built with **Node.js**, **Express.js**, and **MongoDB**. The system includes user registration, login, role-based access control (RBAC), and user management features. The backend provides RESTful APIs while the frontend offers a responsive interface for interacting with the system.

---

## Table of Contents

1. [Frontend](#frontend)
   - [Features](#frontend-features)
   - [Setup and Installation](#frontend-setup-and-installation)
   - [Project Structure](#frontend-project-structure)
2. [Backend](#backend)
   - [Features](#backend-features)
   - [Setup and Installation](#backend-setup-and-installation)
   - [API Endpoints](#api-endpoints)
   - [Project Structure](#backend-project-structure)
3. [Technologies Used](#technologies-used)
4. [Running the Application](#running-the-application)
5. [License](#license)
6. [Acknowledgments](#acknowledgments)

---

## Frontend

The **Frontend** of this application is built using **Angular**. It handles user authentication (login and registration) and provides an interface for admins and users to interact with the system. The frontend communicates with the backend via HTTP requests.

### Frontend Features

- **User Authentication**: Register and login users with JWT-based authentication.
- **Role-Based Access Control (RBAC)**: Restrict access to certain routes based on the user role (Admin/User).
- **CRUD Operations**: Admin users can create, read, update, and delete user information.
- **Route Protection**: Using `AuthGuard` to protect routes from unauthorized access.
- **Responsive UI**: Built with Angular Material and Bootstrap for a clean, responsive design.
- **Notifications**: Toast notifications using **ngx-toastr** for success/error messages.

### Frontend Setup and Installation

1. Clone the frontend repository:
   ```bash
   git clone <frontend-repository-url>


   Navigate to the project folder:

bash

cd <frontend-project-folder>
Install dependencies:

bash

npm install
Run the development server:

bash

ng serve


Open your browser and navigate to http://localhost:4200/.

Frontend Project Structure

src/
├── app/
│   ├── components/
│   │   ├── login/
│   │   ├── user-dashboard/
│   │   ├── registration/
│   │   ├── layout/
│   │   └── home/
│   ├── guards/
│   │   └── auth.guard.ts
│   ├── interceptor/
│   │   └── auth.interceptor.ts
│   ├── models/
│   │   ├── login.ts
│   │   └── registration.ts
│   ├── services/
│   │   └── login.service.ts
│   ├── app-routing.module.ts
│   └── app.module.ts
├── assets/
├── environments/
├── index.html
├── main.ts
└── styles.css

Backend
The Backend is implemented using Node.js and Express.js. It provides RESTful APIs for user management, including registration, login, and CRUD operations. MongoDB is used as the database for storing user data.

Backend Features
User Authentication: Register and login users using JWT-based authentication.
Role-Based Access Control (RBAC): Define user roles and restrict access to certain routes based on these roles.
CRUD Operations: Admins can create, read, update, and delete users.
Secure Password Storage: Passwords are hashed using bcrypt for added security.
Error Handling: All endpoints have proper error handling.
CORS Enabled: The backend is configured to allow cross-origin requests.

Backend Setup and Installation

Clone the backend repository:

bash

git clone <backend-repository-url>
Navigate to the project folder:

bash

cd <backend-project-folder>
Install dependencies:

bash

npm install
Create a .env file for environment variables:

makefile

PORT=5000
JWT_SECRET=your_jwt_secret
MONGO_URI=mongodb://localhost:27017/management_database
Start the server:

bash

npm start
The backend will be accessible at http://localhost:5000.

API Endpoints

User Routes
POST /users/register - Register a new user.
POST /users/login - Login a user and receive a JWT token.
GET /users - Get all users (admin-only).
POST /users/delete - Delete a user by email (admin-only).
POST /users/update - Update a user's information (admin-only).

Backend Project Structure
bash
Copied!
project-folder
├── config
│   └── db.js              # Database connection
├── controller
│   └── rabcController.js  # Request handling logic
├── model
│   └── rabcModel.js       # Mongoose schema for User
├── routes
│   └── route.js           # API routes
├── service
│   └── rabcService.js     # Business logic
├── app.js                 # Main application file
└── package.json           # Dependency configuration

Technologies Used
Frontend:

Angular: Framework for building the web application.
Angular Material: UI components for Angular.
ngx-toastr: Toast notifications for Angular.
RxJS: Library for handling asynchronous events and data streams.
Backend:

Node.js: JavaScript runtime for the backend.
Express.js: Web framework for building APIs.
MongoDB: NoSQL database.
Mongoose: MongoDB object modeling library for Node.js.
bcrypt: Password hashing for secure storage.
jsonwebtoken: JWT for authentication.
cors: Middleware to handle cross-origin requests.

Running the Application
Backend:

Ensure that MongoDB is running locally or update the connection string in config/db.js.
Run the backend using:
bash

npm start
The backend will be accessible at http://localhost:5000.
Frontend:

Ensure the backend server is running.
Start the frontend with:
bash

ng serve
The frontend will be accessible at http://localhost:4200.