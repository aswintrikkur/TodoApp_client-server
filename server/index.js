const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const { todoRoute } = require('./routes/todoRoute');
const { userRoute } = require('./routes/userRoute');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());


connectDB();


const port = process.env.PORT || 3000;
const server = process.env.SERVER_URL || `http://localhost:${port}`
app.listen(port, () => {
    console.log(`----- server started on  : ${server}`);
})


// -----------routes-------------
app.use('/api/user', userRoute)
app.use('/api/todo', todoRoute);


app.all('*', (req, res) => {
    res.json(`API does not exist`);
})

//*******TEST*********
// let data ;
// console.log(typeof(data));
// const a = ['id'];
// const b = Object.keys(data);
// const result = compareArray(a, b);
// console.log(result);