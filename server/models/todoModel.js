const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(     // schema will check when we add data to database
    {
        content: {
            type: String,
            required: true  // by default it is false.
        },
        isComplete: {
            type: Boolean,
            required: [true, ' isComplete is required ---- this is a custom errorMessage from DB']
        },
        isEditable: Boolean,
        errorMessage: {
            type:[ Boolean | String]    // a field with mixed dataType. not recommend
        }
    },
    // { strict: false }
);

module.exports = {Todo: mongoose.model('Todo', todoSchema)};