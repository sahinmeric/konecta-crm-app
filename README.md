# Konecta CRM App

Konecta CRM is a customer relationship management application that allows users to manage and track interactions with clients effectively. This project provides features for user registration, login, and managing employee data.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Registration**: Users can register with a username, password, and role.
- **User Login**: Users can log in to the application securely.
- **JWT Authentication**: Secure routes with JWT tokens.
- **Protected Routes**: Access control for specific routes based on user roles.
- **Employee Management**: Add, update, view and delete employees.
- **Request Management**: Add, update, view and delete employee requests.

## Technologies Used

- **Backend**: Node.js, Express, Sequelize, SQLite
- **Frontend**: React, Material UI
- **Containerization**: Docker, Docker Compose

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/sahinmeric/konecta-crm-app.git
cd konecta-crm-app
```

2. **Navigate to the backend directory:**

```bash
cd backend
```

3. **Start the application using Docker Compose:**

```bash
docker-compose up --build
```

4. **Navigate to the frontend directory:**

```bash
cd frontend
```

5. **Start the application using Docker Compose:**

```bash
docker-compose up --build
```

## Usage

- **Backend API**: Open your browser and go to `http://localhost:5000`.
- **Frontend Application**: Open your browser and go to `http://localhost:3000`.

## API endpoints

Here are the employee-related endpoints along with their HTTP methods:

- **GET** `/api/employees` - Retrieve a list of employees.
- **GET** `/api/employees/:id` - Retrieve a specific employee by ID.
- **POST** `/api/employees` - Create a new employee.
- **PUT** `/api/employees/:id` - Update an existing employee by ID.
- **DELETE** `/api/employees/:id` - Delete an employee by ID.
- **GET** `/api/requests` - Retrieve a list of requests.
- **GET** `/api/requests/:id` - Retrieve a specific request by ID.
- **POST** `/api/requests` - Create a new request.
- **PUT** `/api/requests/:id` - Update an existing request by ID.
- **DELETE** `/api/requests/:id` - Delete a request by ID.

