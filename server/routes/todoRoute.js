const express = require('express');
const router = express.Router();
const { getTodo, addTodo, editTodo, deleteTodo } = require('../controllers/todoController');



router.get('/', getTodo);
router.post('/', addTodo );
router.put('/', editTodo );
router.delete('/', deleteTodo)


module.exports = {todoRoute: router};  