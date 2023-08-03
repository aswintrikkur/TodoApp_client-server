const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { compareArray, handleErrorMessage } = require('./util');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`-----server started in ${PORT}-----`);
})

//------------data------------
let todoList = [];

app.get('/', (req, res) => {
    res.json(todoList);
})


// -----------CRUD API-------------
app.get('/api/todo', (req, res) => {
    res.json(todoList);
});

app.post('/api/todo', (req, res) => {
    const { ...rest } = req.body;

    //Error message to client
    const expectedProp = ['content', 'isComplete', 'isEditable', 'errorMessage'];
    const missingProps = handleErrorMessage(expectedProp, req.body);
    missingProps && res.status(400).json({
        message: `missing properties : ${missingProps} `
    });

    rest.id = uuidv4().slice(0, 8);
    todoList.push(rest)

    res.json(todoList);
});

//handle Edit       /*fix multiple edit-save bug*/
// app.put('/api/todo',(req,res)=>{
//     const{id,isEditable}=req.body;
//     const updatedTodoList = todoList.map(data => {
//         if (data.id === id) {
//             data.isEditable=isEditable;
//         }
//         return data;
//     })
//     todoList = [...updatedTodoList];
//     res.json(todoList);
// });


app.put('/api/todo', (req, res) => { //handle Save
    const { id, content } = req.body;

    //Error message to client
    const expectedProp = ['id', 'content'];
    const missingProps = handleErrorMessage(expectedProp, req.body);
    missingProps && res.status(400).json({
        message: `missing properties : ${missingProps} `
    });

    const updatedTodoList = todoList.map(data => {
        if (data.id === id) {
            if (content == '') {
                data.errorMessage = 'task should not be empty';
                data.isEditable = true;
            } else {
                data.content = content;
                data.isEditable = false;
                data.errorMessage = false;
            }
        }
        return data;
    })
    todoList = [...updatedTodoList];
    res.json(todoList);
});

app.delete('/api/todo', (req, res) => {
    const { id } = req.body;

    //Error message to client
    const expectedProp = ['id'];
    const missingProps = handleErrorMessage(expectedProp, req.body);
    missingProps && res.status(400).json({
        message: `missing properties : ${missingProps} `
    });

    const updatedTodoList = todoList.filter(data => {
        return data.id !== id
    });
    todoList = [...updatedTodoList];
    res.json(todoList);
})

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