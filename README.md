# EventSlap (Frontend Client)

This is the Eventslap Frontend (React App) repo.

- Deployed live version: [Live demo](https://eventslap.netlify.app)

## Description

Eventslap is Full-stack application using the MERN stack (MongoDB, Express, React, and Node.JS).

The backend is a REST API built with ExpressJS, MongoDB, and Mongoose.

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


### Creating your own deployment

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

<img width="1674" alt="Screenshot 2024-03-14 at 12 30 15" src="https://github.com/mig-max/eventManager-frontend/assets/96595540/9390ba8d-c9d3-4e8e-871e-044fe9e50ecb">
<img width="1674" alt="Screenshot 2024-03-14 at 12 31 44" src="https://github.com/mig-max/eventManager-frontend/assets/96595540/5f5ee1bf-50a9-404c-b365-4b6813e86af8">
<img width="1674" alt="Screenshot 2024-03-14 at 12 32 05" src="https://github.com/mig-max/eventManager-frontend/assets/96595540/968a57c0-5e04-4c2e-9cce-74a38933855b">
<img width="1677" alt="Screenshot 2024-03-14 at 12 43 31" src="https://github.com/mig-max/eventManager-frontend/assets/96595540/09479ea7-a960-4c65-9e7d-e4e7bad4e84e">
<img width="1677" alt="Screenshot 2024-03-14 at 12 43 10" src="https://github.com/mig-max/eventManager-frontend/assets/96595540/e3b85bb0-0d42-445a-bfd2-a0dd4faca04a">
<img width="1674" alt="Screenshot 2024-03-14 at 12 32 21" src="https://github.com/mig-max/eventManager-frontend/assets/96595540/2cd4263e-3d8f-49cc-8993-a59bf6d7d5a5">
<img width="595" alt="Screenshot 2024-03-14 at 12 32 42" src="https://github.com/mig-max/eventManager-frontend/assets/96595540/630533e2-ad05-49d4-9014-cc1d3b87268f">
<img width="595" alt="Screenshot 2024-03-14 at 12 33 27" src="https://github.com/mig-max/eventManager-frontend/assets/96595540/9e4d0d71-feee-40bd-b810-ec0a61691cfe">

[Live demo](https://eventslap.netlify.app)






















