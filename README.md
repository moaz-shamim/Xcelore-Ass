# Auth App

Welcome to the Auth App! This application provides a simple authentication system with user management functionalities. The project includes a backend built with Express.js and MongoDB, and a frontend created with React.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Features

- User authentication (sign in, sign up)
- User management (view, edit, delete users)
- Responsive design
- Secure password storage

## Installation

To run this project locally, you need to have Node.js and MongoDB installed.

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/auth-app.git
    cd auth-app
    ```

2. Navigate to the backend directory:

    ```bash
    cd backend
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the backend directory and add the following environment variables:

    ```env
    PORT=4040
    MONGODB_URI=mongodb://localhost:27017
    DB_NAME=authdb
    CORS_ORIGIN=http://localhost:3000
    ```

5. Start the backend server:

    ```bash
    npm run dev
    ```

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the frontend development server:

    ```bash
    npm start
    ```

The frontend should now be running on `http://localhost:3000`.

## Usage

### Sign Up

1. Open your browser and go to `http://localhost:3000`.
2. Click on the "Sign Up" link.
3. Fill in the registration form and submit.

### Sign In

1. Open your browser and go to `http://localhost:3000`.
2. Click on the "Sign In" link.
3. Fill in your credentials and submit.

### Dashboard

After signing in, you will be redirected to the dashboard where you can manage users:

- View the list of users
- Edit user details
- Delete a user

## API Endpoints

The backend API provides the following endpoints:

- `POST /api/auth/signup`: Register a new user
- `POST /api/auth/signin`: Authenticate a user
- `GET /api/user`: Get all users
- `GET /api/user/:id`: Get a user by ID
- `PUT /api/user/update/:id`: Update a user
- `DELETE /api/user/delete/:id`: Delete a user


