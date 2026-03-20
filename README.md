# 🍔 Food Ordering Backend API

A complete **Food Ordering Backend System** built using **Node.js, Express.js, and MongoDB**.
This project provides a secure and scalable backend for managing **users, restaurants, categories, food items, and orders**.

It demonstrates real-world backend concepts like **authentication, role-based access control, RESTful APIs, and database integration**.

---

## 📌 Project Description

This project was developed as a **full-stack backend practice project** to implement real-world application logic.

It focuses on:

* 🔐 Secure authentication using JWT
* 👥 Role-based access (Admin & Client)
* 🍴 Restaurant and food management
* 🧾 Order placement and tracking
* ❌ Secure order cancellation
* 🔄 Order status management

This project reflects strong understanding of:

* Backend architecture
* REST API design
* Database relationships
* Security best practices

---

## 🚀 Features

### 🔐 Authentication

* User Registration
* User Login
* JWT-based authentication
* Protected routes

---

### 👤 Users

* Role-based access (Admin / Client)
* Secure user identification using tokens

---

### 🍴 Restaurant Management

* ➕ Create restaurant (Admin)
* 📄 Get all restaurants
* 🔍 Get restaurant by ID
* ❌ Delete restaurant (Admin)

---

### 🗂️ Category Management

* ➕ Create category
* 📄 Get all categories
* ✏️ Update category
* ❌ Delete category

---

### 🍔 Food Management

* ➕ Create food item
* 📄 Get all food items
* 🔍 Get food by ID
* ✏️ Update food item
* ❌ Delete food item

---

### 🧾 Orders System

* 🛒 Place Order (Client)
* ❌ Cancel Order

  * Client → only their order
  * Admin → any order
* 🔄 Update Order Status (Admin Only)

  * pending → preparing → delivered
* 📄 Get orders

---

## 🛠️ Technologies Used

* **Node.js**
* **Express.js**
* **MongoDB (Mongoose)**
* **JWT (Authentication)**
* **Postman (API Testing)**

---

## 📂 Project Structure

```id="proj1"
food-ordering-backend-api/
│
├── controllers/
│   ├── authController.js
│   ├── orderController.js
│   ├── foodController.js
│   ├── categoryController.js
│   └── restaurantController.js
│
├── models/
│   ├── userModel.js
│   ├── orderModel.js
│   ├── foodModel.js
│   ├── categoryModel.js
│   └── restaurantModel.js
│
├── routes/
│   ├── authRoutes.js
│   ├── orderRoutes.js
│   ├── foodRoutes.js
│   ├── categoryRoutes.js
│   └── restaurantRoutes.js
│
├── middlewares/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── config/
│   └── db.js
│
├── .env
├── .gitignore
├── server.js
└── README.md
```

---

## 📦 API Endpoints

### 🔐 AUTH

```id="api1"
POST /api/v1/auth/register
POST /api/v1/auth/login
```

---

### 🍴 RESTAURANTS

```id="api2"
POST   /api/v1/restaurants
GET    /api/v1/restaurants
GET    /api/v1/restaurants/:id
DELETE /api/v1/restaurants/:id
```

---

### 🗂️ CATEGORY

```id="api3"
POST   /api/v1/categories
GET    /api/v1/categories
PUT    /api/v1/categories/:id
DELETE /api/v1/categories/:id
```

---

### 🍔 FOOD

```id="api4"
POST   /api/v1/foods
GET    /api/v1/foods
GET    /api/v1/foods/:id
PUT    /api/v1/foods/:id
DELETE /api/v1/foods/:id
```

---

### 🧾 ORDERS

```id="api5"
POST   /api/v1/orders          # Place Order
GET    /api/v1/orders          # Get All Orders (Admin)
GET    /api/v1/orders/:id      # Get Single Order
PUT    /api/v1/orders/:id      # Update Status (Admin)
DELETE /api/v1/orders/:id      # Cancel Order
```

---

## 🔐 Authentication

Use Bearer Token:

```id="auth1"
Authorization: Bearer YOUR_TOKEN
```

---

## ▶️ How to Run

### Prerequisites

* Node.js installed
* MongoDB running

---

### Steps

```bash id="run1"
git clone https://github.com/your-username/food-ordering-backend-api.git
cd food-ordering-backend-api
npm install
npm start
```

---

## ⚙️ Environment Variables

Create `.env` file:

```env id="env1"
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

## 🧪 Testing

Use **Postman** to test APIs:

* Register → Login → Get Token
* Use token in headers
* Test all endpoints

---

## 🔒 Security Features

* Password hashing
* JWT authentication
* Role-based authorization
* Protected routes
* Secure order validation (price fetched from DB)

---

## 🎯 What I Learned

* REST API Design
* Authentication & Authorization
* MongoDB Relationships
* Backend Security Best Practices
* Error Handling
* Real-world project structuring

---

## 🚀 Future Improvements

* 💳 Payment Integration (Stripe/Razorpay)
* 🛒 Cart with quantity
* 📦 Order tracking system
* ⭐ Reviews & ratings
* 📱 Frontend integration (React)

---

## 👨‍💻 Author

**Takunda Leonard Gorogodo**
CSE Student | Backend Developer

---

## 📄 License

This project is for **educational purposes**.

---

## 🙏 Acknowledgments

* Node.js & Express community
* MongoDB documentation
* Open-source contributors
