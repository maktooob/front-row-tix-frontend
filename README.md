# Front Row Tix - Frontend

## About

Front Row Tix is an MERN-Stack based eCommerce application, which can be used to sell tickets for different kind of events. 


The App consists of a front and a backend ( https://github.com/maktooob/front-row-tix-backend ).
Features: 
Full CRUD (set user status to "admin")
Authentication with JWT
Only logged in users can buy tickets
Hashed passwords with bcrypt

There is no payment system like stripe implemented yet. Orders will be created and stored in DB, but not sent anywhere.

## Instructions

Install dependencies: npm install
run application: npm run start
Create this .env:
REACT_APP_API_URL=http://localhost:5005/api

Creating a user with status: "admin", will allow you to add, edit and delete events.

## Demo

https://front-row-tix.netlify.app/
