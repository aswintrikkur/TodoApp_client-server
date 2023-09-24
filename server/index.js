const express = require('express');
const cors = require('cors');
const todoRoute = require('./routes/todo');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());


connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`----- server started on  : http://localhost:${port}`);
})


// -----------routes-------------
app.use('/api/todo', todoRoute );


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