"use strict";
const express = require('express'),
    path = require('path'),
    router = express.Router(),
    passport = require('passport'),
    Authentication = require('./middleware/authentication'),
    passportService = require('./config/passport');

router.use(express.static(path.join(__dirname, 'client')));
// router.use(express.static(path.join(__dirname, 'views')));
router.use(express.static(path.join(__dirname, 'front_end')));

const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});

// INDEX ROUTE
router.get('/', function(req, res) {
    res.render('index');
});

// Registration route
router.post('/register', Authentication.register);

// Login route
router.post('/login', requireLogin, Authentication.login);

////////////////////WEATHER
router.get('/user', requireAuth, (req, res) => {
    let user = {
        email: req.user.email,
        fullname: req.user.fullname
    };
    res.json(user);
});

router.use('*', function(req, res) {
    let index = path.resolve(__dirname, 'front_end/index.html');
    res.sendFile(index);
});

module.exports = router;
