const express = require('express');
const { signup } = require('../controllers/userController');
const router = express.Router();



router.post('/signup', signup );
// router.post('/login', login );
// router.get('/profile', profile );



module.exports ={userRoute: router};