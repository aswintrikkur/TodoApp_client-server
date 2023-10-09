const express = require('express');
const { signup, login, profile } = require('../controllers/userController');
const { checkAuth } = require('../middleware/checkAuth');
const router = express.Router();



router.post('/signup', signup );
router.post('/login', login );
router.get('/profile', checkAuth, profile );



module.exports ={userRoute: router};