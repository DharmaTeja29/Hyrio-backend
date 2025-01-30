const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyJWT = require('../middleware/verifyJWT');

router.post('/signup$', userController.handleSignup);

router.post('/login$', userController.handleLogin);

router.get('/refresh$', userController.handleRefreshToken);

router.post('/logout$', userController.handleLogout);

router.put('/username', verifyJWT, userController.putUsername);

router.put('/password', verifyJWT, userController.putPassword);

module.exports = router;