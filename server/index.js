const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server started in ${PORT}`);
})

app.get('/',(req, res) => { 
    res.json('server Running....');
})