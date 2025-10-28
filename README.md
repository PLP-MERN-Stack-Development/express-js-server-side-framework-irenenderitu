# Products RESTful API – Express.js

## 🚀 Overview

This project is a **backend RESTful API** built with **Express.js** for managing a product catalog.  
It supports:

- CRUD operations (Create, Read, Update, Delete)  
- Middleware for logging, authentication, and validation  
- Error handling with custom error classes  
- Advanced features: filtering, pagination, search, and product statistics  

> This API is backend-only and returns JSON responses. You can test it using **Postman, Insomnia, or curl**.

---

## 🛠️ Setup Instructions

1. **Clone the repository**:

git clone
cd express-js-server-side-framework-irenenderitu

Install dependencies:

npm install


Create a .env file in the project root (copy from .env.example):

PORT=3000
API_KEY=12345


Start the server:

npm run dev


Server runs at: http://localhost:3000/

🔹 API Endpoints
Method	Endpoint	Auth	Description
GET	/	No	Root endpoint, returns a welcome message
GET	/api/products	No	Get all products (supports category, search, page, limit query params)
GET	/api/products/:id	No	Get a specific product by ID
POST	/api/products	Yes	Create a new product (requires x-api-key)
PUT	/api/products/:id	Yes	Update an existing product (requires x-api-key)
DELETE	/api/products/:id	Yes	Delete a product (requires x-api-key)
GET	/api/products/stats/all	No	Get product count grouped by category
🔹 Example Requests
1. Get all products
curl http://localhost:3000/api/products

2. Get a product by ID
curl http://localhost:3000/api/products/<product_id>

3. Create a product
curl -X POST http://localhost:3000/api/products \
-H "Content-Type: application/json" \
-H "x-api-key: 12345" \
-d '{
  "name":"Phone",
  "description":"Smartphone",
  "price":899,
  "category":"electronics",
  "inStock":true
}'

4. Update a product
curl -X PUT http://localhost:3000/api/products/<product_id> \
-H "Content-Type: application/json" \
-H "x-api-key: 12345" \
-d '{"price":799,"inStock":false}'

5. Delete a product
curl -X DELETE http://localhost:3000/api/products/<product_id> \
-H "x-api-key: 12345"

6. Get product statistics
curl http://localhost:3000/api/products/stats/all

🔹 Authentication

POST, PUT, DELETE requests require an API key in headers:

x-api-key: 12345


GET requests do not require authentication.

⚠️ Notes

Server runs on port 3000 by default (configurable via .env).

All data is stored in memory (data/products.js) — server restart resets data.

Designed as a backend API — no frontend UI is included.

📂 Project Structure
project-root/
├── server.js
├── package.json
├── .env.example
├── data/
│   └── products.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   ├── logger.js
│   └── validateProduct.js
├── routes/
│   └── products.js
└── utils/
    └── errors.js

🔗 References

Express.js Documentation

RESTful API Design Best Practices

HTTP Status Codes