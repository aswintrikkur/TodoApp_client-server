const { verifyAccessToken } = require("../utils/jwt");


const checkAuth = (req, res, next) => {
    try {
        const  token  = req.headers.authorization;

        const tokenValid = verifyAccessToken(token);
        req.userId = tokenValid._id;
        next();

    } catch (error) {
      res.status(400).json({
        message: 'user unAuthorized'
      })
    }
}

module.exports={checkAuth}