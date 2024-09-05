const { Router } = require('express');
const router = Router();

// Import Middlewares
const {
	validationSignup,
	isUserExistsSignup,
	validateLogin,
	
} = require('../middlewares/userMiddleware');

// Import Controllers
const usersController = require('../controllers/usersController');

router.get('/user/getall', usersController.userGetAllData); 

router.post('/user/signup',validationSignup, isUserExistsSignup , usersController.signUp); // sends verification link to user

router.get('/user/signup/verify/:token', usersController.signUpVerify); // verify user link when clicked

router.post('/user/login', validateLogin, usersController.login);

module.exports = router;
