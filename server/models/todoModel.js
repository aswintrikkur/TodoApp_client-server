const  mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    content: String,
    isComplete: Boolean,
    isEditable: Boolean,
    errorMessage: Boolean
});

module.exports = mongoose.model('Todo', todoSchema)