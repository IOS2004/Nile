# Nile - An E-Commerce Platform for Headphones, Earphones, and IEMs

Welcome to the repository of Nile, an e-commerce platform dedicated to providing the best audio equipment, including headphones, earphones, and IEMs.

## Overview

Nile simplifies the shopping experience for audiophiles by offering a wide range of high-quality audio products and efficient user management.

## Features

1. **User Management:** Secure user authentication and management.
2. **Product Catalog:** Comprehensive catalog of headphones, earphones, and IEMs.
3. **Shopping Cart:** Manage products in the cart and process transactions.
4. **Integration:** APIs for seamless integration with external tools and services.

## Technologies Used

1. **Node.js:** JavaScript runtime for backend development.
2. **Express.js:** Fast and minimalist web framework for Node.js.
3. **MongoDB:** NoSQL database for storing user data and product details.
4. **JWT:** JSON Web Tokens for secure authentication.

## Getting Started

To get started with the Nile codebase, follow these steps:

### Step 1: Clone the Repository

```bash
git clone git@github.com:IOS2004/Nile.git
cd Nile
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Set up environment variables

Create a .env file in the root directory and add the two environment variables, MONGODB_URI and JWT_KEY.

The database connection URI is to be obtained from MONGODB Atlas and JWT secret key if for user to set. 
Format is shown as follows:
```bash
MONGODB_URI='mongodb://user:password@cluster0.iypfp.mongodb.net/mydatabase'
JWT_KEY='your_key'
```

### Step 4: Set up database

* Open MongoDB Compass and connect using your MongoDB URI.

* Create a new database named nile.

* Within the nile database, create a new collection named products.

* Import the data from product_data.json located in the '/config/product_data.json' into the products collection.

### Step 5: Run the application
```bash
npm start
```

## Contributing

We welcome contributions from the community! If you'd like to contribute, please follow these steps:

1. Fork the repository.

2. Create a new branch:
```bash
git checkout -b feature-branch
```
3. Make your changes and commit them:
```bash
git commit -m 'Add new feature'
```
4. Push to the branch:
```bash
git push origin feature-branch
```
5. Create a pull request.