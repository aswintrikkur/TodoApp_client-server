const jwt = require('jsonwebtoken');

const generateAccessToken = (userId) => {
    return jwt.sign({ _id: userId }, process.env.JWT_SECRET_KEY);
}

const verifyAccessToken = (accessToken) => {
    return jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
}

module.exports = { generateAccessToken, verifyAccessToken };
