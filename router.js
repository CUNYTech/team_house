"use strict";
const express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    router = express.Router(),
    passport = require('passport'),
    Authentication = require('./middleware/authentication'),
    passportService = require('./config/passport'),
    fourm = require('./models/fourm')(mongoose);

router.use(express.static(path.join(__dirname, 'client')));
router.use(express.static(path.join(__dirname, 'views')));

const requireAuth = passport.authenticate('jwt', {
    session: false
});
const requireLogin = passport.authenticate('local', {
    session: false
});

// INDEX ROUTE
router.get('/', function(req, res) {
    res.render('index');
});

// Registration route
router.post('/register', Authentication.register);

// Login route
router.post('/login', requireLogin, Authentication.login);

////////////////////
router.get('/user', requireAuth, function(req, res) {
    let user = {
        email: req.user.email,
        fullname: req.user.fullname
    };
    res.json(user);
});

//////////////////////
router.post('/post', requireAuth, function(req, res) {
    const post = new fourm.Post({
        title: req.body.title,
        createdBy: req.user._id,
        imageURL: req.body.imageURL,
        content: req.body.content
    });

    post.save(function(err, post) {
        if (err) {
            return err;
        }
        console.log(post);
        return res.status(201).send({message: "Create Post Success"});
    });
});

router.post('/post/:id', requireAuth, function(req, res) {
    fourm.Post.findById(req.params.id, function(err, user) {
        if (err) return err;

        const comment = new fourm.Comment({
            content: req.body.content,
            createdBy: req.user._id
        });

        comment.save(function(err, post) {
            if (err) {
                return err;
            }
            user.save(
                user.comments.push(comment._id)
            );
            return res.status(201).send({message: "Comment Post Success"});
        });

    });
});

router.get('/post', requireAuth, function(req, res) {
    const Post = fourm.Post;
    Post
        .find()
        .populate('createdBy', 'email fullname')
        .populate('comments')
        // .populate({
        //     path: 'comments',
        //     populate: {
        //         path: 'createdBy',
        //         select: 'email fullname'
        //     }
        // })
        .exec(function(err, Post) {
            if (err) return res.send(err);

            res.json(Post);
        });
});

router.use('*', function(req, res) {
    let index = path.resolve(__dirname, 'views/index.html');
    res.sendFile(index);
});

module.exports = router;
