# Authentication Service using Node.js, Express.js, MongoDB and Mongoose

This Authentication Service is built using Node.js and Express.js, with MongoDB and Mongoose on the backend for database management. The application utilizes JWT web tokens for authentication, which expire in 1 day, and provides 3 APIs: `/signup`, `/signin`, and `/validate`.

The application follows the MVC architecture and has routes like v1, making it easy to update in the future by simply adding a new version. The token is stored on the frontend in HTTP only cookies to prevent hackers.

## Features

- Built with Node.js and Express.js
- Uses MongoDB and Mongoose for database management
- JWT web tokens for authentication
- Provides 3 APIs: `/signup`, `/signin`, and `/validate`
- Follows the MVC architecture
- Routes like v1 for easy version updates
- Token stored on frontend in HTTP only cookies for added security

## Getting Started

To get started with the Authentication Service, follow the instructions below:

1. Clone the project
2. Run `npm install` to install dependencies
3. Create a `.env` file in the root directory of the folder
4. Add environmental variable as:

| Key     | Value                                                                                             |
| ------- | ------------------------------------------------------------------------------------------------- |
| PORT    | 3009                                                                                              |
| JWT_KEY | project                                                                                           |
| DB_URL  | mongodb+srv://USERNAME:PASSWORD~@cluster0.kntkmcb.mongodb.net/DB_NAME?retryWrites=true&w=majority |
| baseURL | where your frontend is hosted                                                                     |

5. Run the command `npm start` to start the server

## APIs

The Authentication Service provides the following APIs:

- `/signup`: Used for creating a new user account.
- `/signin`: Used for logging in to an existing account.
- `/validate`: Used for validating a token and checking if the user is logged in.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Security

This Authentication Service takes security seriously and has implemented measures to protect user data. The use of JWT tokens stored in HTTP only cookies ensures that attackers cannot access sensitive information.

## For Frontend

Check out the [XeroCodee](https://github.com/tautik/XeroCodee) repository on GitHub for the frontend code.
