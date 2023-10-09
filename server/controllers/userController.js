const { User } = require("../models/userModel");
const { generatePasswordHash, comparePasswordHash } = require("../utils/bcrypt");
const { generateAccessToken } = require("../utils/jwt");


const signup = async (req, res, next) => {
    try {
        const { username, emailId, password, mobile } = req.body;
        // TODO: handleMissingProps()

        const isExist = await User.findOne({ emailId });
        if (isExist) {
            return res.status(400).json({
                message: 'user already exist'
            })
        }
        const hashedPassword = await generatePasswordHash(password);
        const dBresponse = await User.create({ username, emailId, password: hashedPassword, mobile })
        return res.json({
            message: 'account created successfully'
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const login = async (req, res, next) => {
try {
    const { emailId, password } = req.body;
    // todo: props check
    const user = await User.findOne({ emailId });
    if (!user) {
        return res.status(400).json({
            message: "user doesn't exists"
        })
    }

    const isValidPassword = await comparePasswordHash(password, user.password);

    if (!isValidPassword) {
        return res.status(400).json({
            message: 'wrong password'
        })
    }

    const accessToken = generateAccessToken(user._id)
    return res.status(200).json(
        {
            username: user.username,
            accessToken
        })


} catch (error) {
    res.status(400).json({
        messase: error.message
    })


}
}

const profile = async (req, res, next) => {
    try {
        res.json( await User.findById(req.userId));

    } catch (error) {
        res.status(400).json({
            messase: error.message
        })
    }

}


module.exports = { signup, login, profile }