# Front Row Tix - Frontend
![Screenshot of Front Row Tix UI](https://raw.githubusercontent.com/maktooob/front-row-tix-frontend/main/src/images/Screenshot%202022-09-01%20at%2014.24.04.png)

## About

Front Row Tix is an MERN-Stack based eCommerce application, which can be used to sell tickets for different kind of events. 

The App consists of a front and a backend ( https://github.com/maktooob/front-row-tix-backend ).
Features: 

- Full CRUD (set user status to "admin")
- Authentication with JWT
- Only logged in users can buy tickets
- Hashed passwords with bcrypt

*There is no payment system like stripe implemented yet. Orders will be created and stored in DB, but not sent anywhere.*

## Instructions

- Install dependencies: npm install
- run application: npm run start
- Create this .env:
- REACT_APP_API_URL=http://localhost:5005/api

**Creating a user with status: "admin", will allow you to add, edit and delete events, by clicking the plus icon on the Browse Events Page.**

## Demo

https://front-row-tix.netlify.app/
