const { Router } = require('express');
const router = Router();

// Import Middlewares
const {
	validationSignup,
	isUserExistsSignup,
	validateLogin,
	validateUpdateUser,
	validateDelete
	
} = require('../middlewares/userMiddleware');

// Import Controllers
const usersController = require('../controllers/usersController');

router.get('/user/getall', usersController.userGetAllData); 

router.post('/user/signup',validationSignup, isUserExistsSignup , usersController.signUp); // sends verification link to user

router.get('/user/signup/verify/:token', usersController.signUpVerify); // verify user link when clicked

router.post('/user/login', validateLogin, usersController.login);

router.put('/user/update/:id', validateUpdateUser, usersController.updateUser);

router.delete('/user/delete/:id', validateDelete, usersController.userdelete);

module.exports = router;
