# Nile - An E-Commerce Platform for Headphones, Earphones, and IEMs

Welcome to the repository of Nile, an e-commerce platform dedicated to providing the best audio equipment, including headphones, earphones, and IEMs.


*Overview*

Nile simplifies the shopping experience for audiophiles by offering a wide range of high-quality audio products and efficient user management.

*Features*

1. User Management: Secure user authentication and management.

2. Product Catalog: Comprehensive catalog of headphones, earphones, and IEMs.

3. Shopping Cart: Manage products in the cart and process transactions.

4. Integration: APIs for seamless integration with external tools and services.
   

*Technologies Used*

1. Node.js: JavaScript runtime for backend development.

2. Express.js: Fast and minimalist web framework for Node.js.

3. MongoDB: NoSQL database for storing user data and product details.

4. JWT: JSON Web Tokens for secure authentication.
   

*Getting Started*

To get started with Nile codebase, follow these steps:

Step 1: Clone the repository
```bash
git clone https://github.com/yourusername/E-Store-backend.git
cd E-Store-backend
```

Step 2: Install dependencies
```bash
npm install
```
Step 3: Set up environment variables
Create a .env file in the root directory and add the necessary environment variables, such as the database connection URI and JWT secret.
```bash
MONGODB_URI='mongodb+srv://<username>:<password>@cluster0.iypfp.mongodb.net'
JWT_KEY='your_key'
```

Step 4: Set up MongoDB Compass

* Open MongoDB Compass and connect using your MongoDB URI.

* Create a new database named nile.

* Within the nile database, create a new collection named products.

* Import the data from product_data.json located in the config directory into the products collection.

Step 5: Run the application
```bash
npm start
```

*Contributing*

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