# Essenté API Documentation

Base URL: `/api/v1`

## Authentication

### Register
- **URL**: `/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response**: `201 Created` with Token

### Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response**: `200 OK` with Token

### Get Current User
- **URL**: `/auth/me`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Success Response**: `200 OK` with User data

## Products

### Get All Products
- **URL**: `/products`
- **Method**: `GET`
- **Success Response**: `200 OK` with Array of Products

### Get Single Product
- **URL**: `/products/:id`
- **Method**: `GET`
- **Success Response**: `200 OK` with Product data

### Create Product (Admin Only)
- **URL**: `/products`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "name": "Product Name",
    "description": "Description...",
    "price": 100,
    "category": "vetements"
  }
  ```

## AI Integration

### Chat with AI
- **URL**: `/ai/chat`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "message": "What products do you recommend for winter?"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "response": "Based on your query..."
    }
  }
  ```
