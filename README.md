## Introduction

This project is an API built using Express in Node.js following an MVC pattern. It serves as the backend for an e-commerce website that sells custom-made leather clothing. It consists of a customer-facing section for purchases and an owner-facing section for managing products & staff (CRUD operations) and orders.

## Technologies

- **Backend**: NodeJs (Express)
- **Database**: NoSQL (MongoDB)

## Routes
### Main Routes

- **Products Catalog**: Provides users access to the product catalog.
- **Shopping & Checkout Section**: Allows users to create and modify their cart and complete the purchase using Stripe.
- **Contact Form**: Enables users to contact the company unsing MailGun.
- **Admin Authentication & Management**: Allows admins to authenticate and access secure API routes.
- **Dashboard**: Enables employees to manage products and orders. It also allows admins to manage company employees.

### Authentication Routes

- **Register**: Endpoints for admin or employee registration.
- **Login**: Endpoint for admin or employee login.

## Database

The database is structured into 3 schemas:
- Users (Admins and employees)
- Products
- Orders

## Security 

- Passwords are securely hashed before storage.
- Different permission levels are implemented depending on the role (Admin/employee/user).
- Payments are processed and secured through Stripe.

## Deployment

The API is deployed on Heroku, ensuring high availability and robust performance. You can access it [here](https://ashmademoiselle-8623d0938879.herokuapp.com/products)

## Further Possibilities

- Implementing filtering options.
- Send a confirmation email after order validation.
- Customize shipping costs based on the location.
- Adding a caching layer for better performance.

## What I learned

This project has primarily allowed me to deeply understand the interactions between the different structures of the MVC models and enhance my knowledge of asynchronous functions. It has given me a great deal of confidence in my abilities and a strong determination to further develop my backend skills.

Additionally, this project marked my first experience working collaboratively with a Front-End team. The most significant lesson I learned from this project was the necessity of detailed planning for the API structure in advance. We also held daily meetings to discuss our progress and challenges, which proved to be invaluable.

## Documentation

The API is thoroughly documented and can be accessed through the [Postman Documentation](https://documenter.getpostman.com/view/28778050/2s9YC7UBxT#4d4c2c3e-87fc-4d0e-a4c4-7154c04de37c)

Each endpoint is meticulously documented, providing details on HTTP methods, query parameters, required fields for POST requests, and much more.

## Getting Started

To get started with the API, follow these steps:

1. Clone the repository to your local machine using `git clone`.
    
2. Navigate to the project directory.
    
3. Initialize a new Node.js project with `npm init`.
    
4. Install the required dependencies with `npm install`.
    
5. Run the development server with `npm run dev`.
