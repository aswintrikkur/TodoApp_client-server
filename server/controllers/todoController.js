const { handleErrorMessage } = require("../utils/handleMissingProps");

const getTodo = async (req, res) => {
    try {
        const data = await Todo.find();
        res.json(data)
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const addTodo = async (req, res) => {

    try {

        const { ...rest } = req.body;
        // Error message to client
        const expectedProp = ['content', 'isComplete', 'isEditable', 'errorMessage'];
        const missingProps = handleErrorMessage(expectedProp, req.body);
        if (missingProps) {
            return res.status(400).json({ message: `missing properties : ${missingProps} ` });
        }

        const response = await Todo.create(rest);
        /*  const newTodo= new Todo(rest);      //* alternate method for inserting data in DB
            newTodo.save();
        */
        // res.json({message:'todo added successfully'});
        res.json(await Todo.find()); //! Do not use this. Pass response to fontend and do array manipulation in frondend
    } catch (error) {
        // res.status(400).json(error.message);
        // console.log(error);
    }

}


const editTodo = async (req, res) => { //handle Save
    const { _id, content, isComplete } = req.body;

    //Error message to client
    const expectedProp = ['_id', 'content', 'isComplete'];
    const missingProps = handleErrorMessage(expectedProp, req.body);
    if (missingProps) {
        return res.status(400).json({ message: `missing properties : ${missingProps} ` });
    }

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

}

const deleteTodo = async (req, res) => {
    const { _id } = req.body;

    //Error message to client
    const expectedProp = ['_id'];
    const missingProps = handleErrorMessage(expectedProp, req.body);
    if (missingProps) {
        return res.status(400).json({ message: `missing properties : ${missingProps} ` });
    }

    try {
        await Todo.findByIdAndDelete(_id);
        res.json(await Todo.find());

    } catch (error) {
        res.status(400).json(error.message)
        // console.log(error);
    }

}

module.exports = { getTodo, addTodo, editTodo, deleteTodo }