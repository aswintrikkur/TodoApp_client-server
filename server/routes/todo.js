const express = require('express');
// const { v4: uuidv4 } = require('uuid');
const { handleErrorMessage } = require('../util');
const router = express.Router();
const Todo = require('../models/todoModel')



//------------data------------
let todoList = [];

router.get('/', async (req, res) => {
    try {
        const data = await Todo.find();
        res.json(data)
    } catch (error) {
        res.status(400).json(error.message);
    }
});

router.post('/', async (req, res) => {
    const { ...rest } = req.body;
    // Error message to client
    const expectedProp = ['content', 'isComplete', 'isEditable', 'errorMessage'];
    const missingProps = handleErrorMessage(expectedProp, req.body);
    missingProps && res.status(400).json({
        message: `missing properties : ${missingProps} `
    });

    try {
        const response = await Todo.create(rest);
        /*  const newTodo= new Todo(rest);      //* alternate method for inserting data in DB
            newTodo.save();
        */
        // res.json({message:'todo added successfully'});
        // res.json(await Todo.find()); //! Do not use this. Pass response to fontend and do array manipulation in frondend
        res.json(response);
    } catch (error) {
        res.status(400).json(error.message);
        console.log(error);
    }

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


router.put('/', async (req, res) => { //handle Save
    const { _id, content, isComplete } = req.body;

    //Error message to client
    const expectedProp = ['_id', 'content', 'isComplete'];
    const missingProps = handleErrorMessage(expectedProp, req.body);
    missingProps && res.status(400).json({
        message: `missing properties : ${missingProps} `
    });

    try {
        if (content == '') {
            await Todo.findByIdAndUpdate(_id, { errorMessage: 'task should not be empty', isEditable: true });
            res.json(await Todo.find());
        }
        else {
            const fieldToUpdate = {
                content,
                isEditable: false,
                errorMessage: false,
                isComplete
            }
            const response = await Todo.findByIdAndUpdate(_id, fieldToUpdate, {
                new: true   // to get response as updated data. As default old data will be recieved as response. 
            });
            res.json(await Todo.find()); //! Do not use this. Pass response to fontend and do array manipulation in frondend
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

});

router.delete('/', async (req, res) => {
    const { _id } = req.body;

    //Error message to client
    const expectedProp = ['_id'];
    const missingProps = handleErrorMessage(expectedProp, req.body);
    missingProps && res.status(400).json({
        message: `missing properties : ${missingProps} `
    });

    try {
        await Todo.findByIdAndDelete(_id);
        res.json(await Todo.find());

    } catch (error) {
        res.status(400).json(error.message)
        // console.log(error);
    }

})


module.exports = router;  