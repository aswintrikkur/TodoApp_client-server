const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server started in ${PORT}`);
})

//------------data------------
let todoList = [];

app.get('/',(req,res)=>{
    res.json(todoList);
})


// -----------CRUD API-------------
app.get('/api/todo', (req, res) => {
    res.json(todoList);
});

app.post('/api/todo', (req, res) => {

    const { ...rest } = req.body;
    rest.id = uuidv4().slice(0, 8);
    todoList.push(rest)

    res.json(todoList);
});

app.put('/api/todo', (req, res) => {
    const { content, id, ...rest } = req.body;
    const updatedTodoList = todoList.map(data => {
        data.id === id && (data.content = content);
        return data;
    })
    todoList = [...updatedTodoList];

    res.json(todoList);
});

app.delete('/api/todo', (req, res) => {
    const { id } = req.body;
    const updatedTodoList = todoList.filter(data => {
        return data.id !== id
    });
    todoList = [...updatedTodoList];
    res.json(todoList);
})

app.all('*', (req, res) => {
    res.json(`API does not exist`);
})