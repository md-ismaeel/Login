<!-- # SignUp and SignIn Project

## Hosted Link

[Click here to view the project](https://kodekalp-assignment.netlify.app/)

## Login Page

![Login Page](/Frontend/src/assets/Screenshot%202024-09-20%20133616.png)

## Registration Page

![Registration Page](/Frontend/src/assets/Screenshot%202024-09-20%20133625.png)

## Features

- **User Registration:** Sign up for a new account using email, mobileNumber,userName,fist & lastName and password.
- **Email Confirmation:** After registration, users receive a confirmation email through an SMTP server.
- **Secure SignIn:** Log in to the system using your registered email,mobileNumber,userName and password.
- **Token-Based Authentication:** Use JWT to manage user sessions securely.
- **Form Validation:** Ensure valid input during registration and login processes.

## Tech Stack

### Frontend

- **React.js:** For building the user interface.
- **Tailwind CSS:** For styling and responsive design.
- **React Router:** For handling navigation between different pages.

### Backend

- **Node.js:** Server-side runtime environment.
- **Express.js:** Web framework for building the RESTful API.
- **MongoDB:** NoSQL database for storing user information.
- **JWT (JSON Web Tokens):** For user authentication and authorization.
- **Nodemailer:** For sending email confirmation using an SMTP server.
- **Mongoose:** ODM (Object Data Modeling) library for MongoDB and Node.js.

## How to Install and Run on Your Local Machine

### Prerequisites

- **Node.js** (version 14 or higher)
- **npm** or **yarn**
- **MongoDB** (for the database)
- **SMTP server** (for email confirmation)
- **Git** (to clone the repository)

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/md-ismaeel/kodekalp_assignment.git
   ```

2. **Create a .env file in the root directory and configure the following variables:**

   ```bash
    MONGO_URI=your_mongo_db_uri
    JWT_SECRET=your_jwt_secret
    SMTP_HOST=your_smtp_host
    SMTP_USER=your_smtp_user
    SMTP_PASSWORD=your_smtp_password
   ```

# Author

- Md Ismail --> -->
