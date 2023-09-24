const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { handleErrorMessage } = require('../util');
const router = express.Router();
const Todo = require('../models/todoModel')



//------------data------------
let todoList = [];

router.get('/', async (req, res) => {
    // res.json(todoList);
    const data = await Todo.find();
    res.json(data)

});

router.post('/', async(req, res) => {
    const { ...rest } = req.body;
    
    //Error message to client
    // const expectedProp = ['content', 'isComplete', 'isEditable', 'errorMessage'];
    // const missingProps = handleErrorMessage(expectedProp, req.body);
    // missingProps && res.status(400).json({
    //     message: `missing properties : ${missingProps} `
    // });
    
    // rest.id = uuidv4().slice(0, 8);
    //  todoList.push(rest)
    
    // res.json(todoList);

    Todo.create(rest);
    res.json('todo added successfully');
});

//handle Edit       /*fix multiple edit-save bug*/
// router.put('/',(req,res)=>{
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


router.put('/', (req, res) => { //handle Save
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

router.delete('/', (req, res) => {
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


module.exports = router;