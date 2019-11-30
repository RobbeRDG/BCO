const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const resultatenController = require('../controllers/resultatenController')
const sessionChecker = require('../middleware/sessionChecker');
const isLoggedIn = require('../middleware/isLoggedIn');


router.post('/', sessionChecker, userController.create_user);
router.get('/', sessionChecker, userController.create_user_get);
router.get('/login', sessionChecker,userController.login_user_get);
router.post('/login', sessionChecker,userController.login_user);
router.get('/me', isLoggedIn, userController.get_loggedin_user);
router.get('/me/resultaten', isLoggedIn, resultatenController.persoonlijke_resultaten_list);
router.get('/logout', isLoggedIn,  userController.logout_user);


module.exports = router;
