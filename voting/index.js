const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connect = require('./config/db');
const userRouter = require('./routes/userRoute');
const categoryRouter = require('./routes/partiesRoute');
require('dotenv').config();
connect();

//app
const app = express()
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', userRouter);
app.use('/api', categoryRouter);


app.use('/uploads', express.static('uploads'));


const port = process.env.PORT || 5003;
app.listen(port, () => console.log(`Server is running on port ${port}`))