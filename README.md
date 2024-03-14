# EventSlap (Frontend Client)

This is the Eventslap Frontend (React App) repo.

- Deployed live version: [Live demo](https://eventslap.netlify.app)

## Description

Eventslap is Full-stack application using the MERN stack (MongoDB, Express, React, and Node.JS)
This repository contains the backend code for the server of this application. It is a RESTful API built with ExpressJS, MongoDB, and Mongoose.

It allows logged-in users to manage all the events and venues that they own in the database doing full CRUD. Anonymous users can see venues, events and free events,
and also doing search by name or date. Logged-in users can create new venues and events, and view all existing ones.

## Technical Requirements

- SPA frontend, built with React, consisting of multiple views and implementing all CRUD actions.
- Include sign-up, log-in, and log-out functionality with encrypted passwords and authorization (logged-in users can do additional things).

- REST API backend built with ExpressJS, MongoDB, and Mongoose.
- REST API backend with routes that perform all CRUD actions for two models (excluding the user model).
- Backend validation and centralized error handling the REST API.

## Backend

- Backend live server: [Backend live server](https://event-management-api.adaptable.app)

- Backend server repo: [Backend Server Repo](https://github.com/mig-max/eventManager-backend)

## Instructions
To run on your computer, follow these steps:
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Create a `.env` file with the following environment variables:
   - `VITE_APP_URL=http://localhost:5005`
4. Run the application: `npm run dev`.

## Environment variables

### Hosted on your localhost:

Add the following environment variables in `.env` files:

#### Server
- `PORT=<your-port>` (5005)
- `ORIGIN=http:/http://localhost:5173/`
- `TOKEN_SECRET=<your-token-secret>`

#### Cloudinary credentials for image upload
- `CLOUDINARY_NAME = add-your-cloudinary-name`
- `CLOUDINARY_KEY = add-your-cloudinary-key`
- `CLOUDINARY_SECRET = add-your-cloudinary-secret`

#### Client
- `VITE_APP_URL=http://localhost:5005`


### Case 2: Creating your own deployment

#### Backend using adaptable.io

- `TOKEN_SECRET=<your-token-secret>`
- `MONGODB_URI=mongodb+srv://<your-mongodb-atlas-password-+-name-of-db>`
- `ORIGIN=<your-netlify-app-domain>`

- `CLOUDINARY_NAME = add-your-cloudinary-name`
- `CLOUDINARY_KEY = add-your-cloudinary-key`
- `CLOUDINARY_SECRET = add-your-cloudinary-secret`

#### Fronted using netlify.app

- `CI=false` (required for SPA applications deployed on this service to redirect requests to index.html)

- `VITE_API_URL=<your-adaptable-app-domain>`

- `CLOUDINARY_NAME = add-your-cloudinary-name`
- `CLOUDINARY_KEY = add-your-cloudinary-key`
- `CLOUDINARY_SECRET = add-your-cloudinary-secret`


## Screenshots