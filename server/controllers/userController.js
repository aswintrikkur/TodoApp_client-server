const { User } = require("../models/userModel")


const signup = async (req, res, next) => {
    const { username, emailId, password } = req.body;
    // 
    const isExist = User.find(emailId);
    if(isExist){
        return res.status(400).json({
            message: 'user already exist'
        })
    }

    // TODO: hash the password send to DB.

    const dBresponse = User.create({username, emailId, })

}

module.exports ={ signup}