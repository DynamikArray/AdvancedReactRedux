//Main starting point of our server application application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const env = require('dotenv').config();
const app = express();
const router = require('./router.js');
const mongoose = require('mongoose');
const cors = require('cors');


//App setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));
router(app);


//DB Setup
mongoose.connect(process.env.DB_URL, {useMongoClient: true});

//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server Listening On Port', port);
