const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/:username', userService.sendPhone);
// router.post('/otp/:token', otp);
module.exports = router;

function authenticate(req, res, next) {
    console.log(req.body);
    userService.authenticate(req.body)
        .then(user => user ? res.redirect('/otp') : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function otp(req, res, next){
    userService.otp(req.body);
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}