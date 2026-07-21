# Rose Flora – Full-Stack Flower eCommerce Platform

Rose Flora is a modern full-stack eCommerce web application designed for an online flower shop. The platform allows customers to explore flower products, create accounts, verify their email addresses, manage their shopping cart, and securely place orders using Cash on Delivery or card payments.

The project also includes a dedicated administration portal for managing products, categories, inventory, orders, and the overall eCommerce workflow.

The application is built with React and Vite for the frontend, Node.js and Express.js for the REST API, Prisma ORM, and MySQL. Product images are managed through Cloudinary, while Stripe is integrated for secure online card payments.

---

## ✨ Features

### 👤 Customer Features

- Customer registration and authentication
- Secure password hashing
- Email verification using token-based verification links
- Customer session management
- Browse available flower products
- View featured products
- View new arrival products
- Browse products by category
- View detailed product information
- Product image galleries
- Add products to the shopping cart
- Update cart item quantities
- Remove products from the cart
- Checkout and shipping information collection
- Cash on Delivery payment option
- Secure card payments with Stripe
- Order creation and processing
- Responsive user interface for desktop and mobile devices

---

## 🛠️ Admin Portal

Rose Flora includes a separate administration application for managing the eCommerce platform.

### Admin Features

- Secure admin authentication
- Admin dashboard
- Product management
- Create new products
- Update existing products
- Soft delete and manage product availability
- Product stock quantity management
- Featured product management
- New arrival management
- Category management
- Product image upload and management
- Cloudinary image integration
- Order management
- View customer orders
- View payment information
- Monitor Cash on Delivery orders
- Monitor card payment orders
- Manage the order processing workflow

---

## 💳 Payment Integration

The platform supports multiple payment methods.

### Cash on Delivery

Customers can place orders and pay when their flowers are delivered.

### Card Payments

Secure online card payments are handled through Stripe.

The payment workflow includes:

- Stripe Payment Intent creation
- Secure payment processing
- Payment status tracking
- Order creation
- Stock processing
- Payment webhook handling
- Protection against duplicate stock processing

---

## 📧 Email Verification

New customers receive an email verification link after registration.

The verification system includes:

- Secure verification token generation
- Token expiration
- Email verification links
- Verification status management
- Prevention of invalid or expired verification links

---

## ☁️ Image Management

Product images are uploaded and managed using Cloudinary.

The system stores:

- Cloudinary image URLs
- Cloudinary public IDs
- Main product image information
- Product image display order

Images are delivered through Cloudinary's cloud infrastructure.

---

## 🧰 Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- Bootstrap
- Swiper
- React Icons
- Stripe React SDK

### Admin Portal

- React
- Vite
- React Router
- Axios

### Backend

- Node.js
- Express.js
- Prisma ORM
- REST API
- JWT Authentication
- bcrypt

### Database

- MySQL

### Cloud Services & Integrations

- Cloudinary – Product image storage and delivery
- Stripe – Secure card payment processing
- Email Service – Customer email verification

### Deployment

- Vercel – Customer frontend
- Vercel – Admin portal
- Northflank – Backend API and MySQL infrastructure

---

## 🔐 Security Considerations

The application includes several security-focused implementation practices:

- Password hashing using bcrypt
- JWT-based authentication
- HTTP-only authentication cookie support
- Environment-based secret management
- CORS origin restrictions
- Email verification tokens with expiration
- Stripe secret keys stored only on the backend
- Stripe webhook verification
- Server-side product and pricing validation
- Database relationship constraints
- Stock processing protection
- Cloud service credentials isolated from frontend applications

---

## 🌐 Live Applications

👉 https://rose-flora.vercel.app
