# AirBnB Clone

https://brian-airbnb-clone.onrender.com

## AirBnb Database Schema
![AirBnb-Diagram]

[AirBnb-Diagram]: ./frontend/images/airbnb_dbdiagram.png

## Quick Summary

My AirBnb clone like the original can sign up and login users. Those users can create their own spots that others can book and review. They can add images of the spots so others can get a preview and can provide their reviews with images for a better review. Users can book any spot as long as it doesn't belong to them and they don't book on a date another user has booked. With the reviews you can leave your feelings and ratings while also providing images for clarity.

## App In Action



#### Sign Up User

![Sign-Up-User]

[Sign-Up-User]: ./frontend/images/Screenshot 2023-03-20 085006.png

#### Login User

![Login-User]

[Login-User]: ./frontend/images/Screenshot%202023-02-27%20083512.png

#### Get All Spots

![Get-All-Spots]

[Get-All-Spots]: ./frontend/images/Screenshot%202023-02-27%20091743.png

#### Get Details Of Spot From Id

![Get-Details-Of-Spot-From-Id]

[Get-Details-Of-Spot-From-Id]: ./frontend/images/Screenshot%202023-02-27%20091959.png

#### Get All Spots Of Current User

![Get-All-Spots-Of-Current-User]

[Get-All-Spots-Of-Current-User]: ./frontend/images/Screenshot%202023-02-27%20091924.png

#### Create A Spot

![Create-A-Spot]

[Create-A-Spot]: ./frontend/images/Screenshot%202023-02-27%20083623.png

#### Create An Image For Spot

![Create-An-Image-For-Spot]

[Create-An-Image-For-Spot]: ./frontend/images/Screenshot%202023-02-27%20083654.png

#### Edit A Spot

![Edit-A-Spot-1]

[Edit-A-Spot-1]: ./frontend/images/Screenshot%202023-02-27%20083623.png


![Edit-A-Spot-2]

[Edit-A-Spot-2]: ./frontend/images/Screenshot%202023-02-27%20092845.png

#### Create A Review For Spot

![Create-A-Review]

[Create-A-Review]: ./frontend/images/Screenshot%202023-02-27%20093247.png

#### Create An Image for Review

![Create-An-Image-Review]

[Create-An-Image-Review]: ./frontend/images/Screenshot%202023-02-27%20083752.png

#### Get Reviews Of Current User

![Get-Reviews-Of-Current-User]

[Get-Reviews-Of-Current-User]: ./frontend/images/Screenshot%202023-02-27%20093556.png

#### Get Reviews By Spot

![Get-Reviews-By-Spot]

[Get-Reviews-By-Spot]: ./frontend/images/Screenshot%202023-02-27%20093742.png

#### Edit A Review

![Edit-A-Review-1]

[Edit-A-Review-1]: ./frontend/images/Screenshot%202023-02-27%20094035.png


![Edit-A-Review-2]

[Edit-A-Review-2]: ./frontend/images/Screenshot%202023-02-27%20093247.png

#### Create A Booking On Spot

![Create-A-Booking]

[Create-A-Booking]: ./frontend/images/Screenshot%202023-02-27%20094235.png



## Techs/Languages Used

I coded the clone in javascript while using sequelize to work with the database and express to make the api. Both sequelize and express are node based and work very well together. Node is a javascript runtime environment and library for running web app outside of browsers and backend API services. I also used npm which stands for node package manager which means its a library of javascript packages that made coding the API much easier. One thing it helped with was installing dotenv-cli and sequelize-cli which made it so I could use the commands for those tools in the command line.

## Technical Problems

Something I had a constant problem with was editing existing spots/bookings/reviews. They need to make sure that the current item property you are editing exists while the req.body property exists. I kept trying to check for properties that didn't exist, so if I did not want to edit the address of a spot but wanted to edit the price, I would get an error saying the address property isn't in the req.body even though that's not the property I was trying to change. I had to check if the req.body had the property I wanted and make sure it wasn't throwing errors because I was looking for an undefined property. Another challenge was the dates because of how much code it takes just to turn a simple year,month,day to an integer to compare to another. And even when I figured out the date integers I then had to make sure I thought of every situation where you would try to book dates inside of each other leading to many headaches.

## Installation Instructions

First step is to initialize the server`s package.json by running npm init -y and npm install cookie-parser, cors ,csurf , dotenv , express , express-async-errors, helmet, jsonwebtoken, morgan, per-env, sequelize@6, sequelize-cli@6, and pg. Then npm install -D sqlite3, dotenv=cli, and nodemon. Make a .env file and make a PORT= to a port you have (I recommend 8000), DB_FILE=db/dev.db for your database, JWT_SECRET= and you can generate a random string with openssl rand -base64 10 in your Ubuntu terminal. Next you create a config folder in your server folder with an index.js file with this,
```module.exports = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8000,
  dbFile: process.env.DB_FILE,
  jwtConfig: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN
  }
};

Then we setup sequelize by creating a .sequelizerc file in your backend folder with the following content,
const path = require('path');

module.exports = {
  config: path.resolve('config', 'database.js'),
  'models-path': path.resolve('db', 'models'),
  'seeders-path': path.resolve('db', 'seeders'),
  'migrations-path': path.resolve('db', 'migrations')
}; ```

and initialize sequelize by running npx sequelize init which will create a folder in your config folder called database.js that you will populate with,
const config = require('./index');

module.exports = {
  development: {
    storage: config.dbFile,
    dialect: "sqlite",
    seederStorage: "sequelize",
    logQueryParameters: true,
    typeValidation: true
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    define: {
      schema: process.env.SCHEMA
    }
  }

Now you will create a file in your backend foler called psql-setup-script.js and populate it with the following,

const { sequelize } = require('./db/models');

sequelize.showAllSchemas({ logging: false }).then(async (data) => {
  if (!data.includes(process.env.SCHEMA)) {
    await sequelize.createSchema(process.env.SCHEMA);
  }
});

Finally migrate the dabase by running npx dotenv sequelize db:migrate.

Now for express we will create a file called app.js in your backend folder and initialize the express application. At the top of the file you will write the following,

const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { environment } = require('./config');
const isProduction = environment === 'production';
const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

These are the main boilerplate for our express application. Now we add the routes by creating a routes folder and adding an index.js file with the following in it,

const express = require('express');
const router = express.Router();

router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

module.exports = router;

Back in the app.js folder we will add,

const routes = require('./routes');
app.use(routes);

to connect the routes to the app.js file.
