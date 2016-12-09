"use strict";

const express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    router = express.Router(),
    passport = require('passport'),
    Authentication = require('./middleware/authentication'),
    passportService = require('./config/passport'),
    forum = require('./models/forum')(mongoose),
    User = require('./models/user'),
    axios = require('axios'),
    toJson = require('xmljson').to_json;

router.use('/node',express.static(path.join(__dirname, 'node_modules')));
router.use(express.static(path.join(__dirname, 'front_end')));

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
        id: req.user._id,
        email: req.user.email,
        fullname: req.user.fullname
    };
    res.json(user);
});

//////////////////////
router.post('/post', requireAuth, function(req, res) {
    const post = new forum.Post({
        title: req.body.title,
        createdBy: req.user._id,
        imageURL: req.body.imageURL,
        content: req.body.content,
        zipcode: req.body.zipcode,
        address: req.body.address,
        rent: req.body.rent,
        sale: req.body.sale
    });

    console.log(post);
    post.save(function(err, post) {
        if (err) {
            return err;
        }
        console.log(post);
        return res.status(201).send({message: "Create Post Success"});
    });
});

router.post('/post/:id', requireAuth, function(req, res) {
    forum.Post.findById(req.params.id, function(err, user) {
        if (err) return err;

        const comment = new forum.Comment({
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

router.get('/api/post', requireAuth, function(req, res) {
    const Post = forum.Post;
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


router.get('/api/post/:id', requireAuth, function(req, res) {
    console.log(req.params.id);
    const Post = forum.Post;
    Post
        .findOne({_id: req.params.id})
        .populate('createdBy', 'email fullname')
        .populate('comments')
        .populate({
            path: 'comments',
            populate: {
                path: 'createdBy',
                select: 'email fullname'
            }
        })
        .exec(function(err, Post) {
            if (err) return res.send(err);

            console.log(Post);
            res.json(Post);
        });
});

router.get('/public/post', function(req, res) {
    const Post = forum.Post;
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

router.get('/public/post/:id', function(req, res) {
    console.log(req.params.id);
    const Post = forum.Post;
    Post
        .findOne({_id: req.params.id})
        .populate('createdBy', 'email fullname')
        .populate('comments')
        .populate({
            path: 'comments',
            populate: {
                path: 'createdBy',
                select: 'email fullname'
            }
        })
        .exec(function(err, Post) {
            if (err) return res.send(err);

            console.log(Post);
            res.json(Post);
        });
});

router.put('/put/:id', requireAuth, function(req, res) {
    var fullname = req.body.fullname;
    var email = req.body.email;
    console.log(req.user._id);
    User.findById(req.user._id, function(err, userData){
        var user = userData;
        user.fullname = fullname;
        user.email = email;

        user.save(function(err){
            if(err){
                return err;
            } else {
                return res.status(201).send({message: "Profile Success"});
            }
        });
    });
});

router.put('/put/post/:id', requireAuth, function(req, res) {
    var Post = forum.post;
    forum.Post.findById(req.params.id, function(err, postData) {
        if (err) return err;

        var post = postData;
        post.title = req.body.title;
        post.imageURL = req.body.imageURL;
        post.content = req.body.content;
        post.zipcode = req.body.zipcode;
        post.address = req.body.address;
        post.rent = req.body.rent;
        post.sale = req.body.sale;

        post.save(function(err){
            if(err){
                return err;
            } else {
                return res.status(201).send({message: "Post Success"});
            }
        });
    });
});

router.delete('/delete/post/:postid', requireAuth, function(req, res) {
    var Post = forum.post;
    console.log("here");
    forum.Post.findById(req.params.id, function(err, postData) {
        if (err){ 
            console.log(err);
            return err;
        }

        var post = postData;
        console.log(postData);
        post.delete(function(err){
            if(err){
                return err;
            } else {
                return res.status(410).send({message: "Delete Success"});
            }
        });
    });
});

router.get('/house/:address/:citystate', (req, res) =>{
    const address = req.params.address,
          citystate = req.params.citystate,
          Zillow = 'http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=',
          KEY = process.env.ZWSID || require('./config/main').ZWSID;

        let house = Zillow + KEY + '&address=' + address + '&citystatezip=' + citystate;

        axios.get(house)
                .then(function (response) {
                    toJson(response.data, function (error, data) {
                        res.json(data);
                    });
                })
                .catch(function (error) {
                    return error;
                });
});

router.use('*', function(req, res) {
    let index = path.resolve(__dirname, 'front_end/index.html');
    res.sendFile(index);
});

module.exports = router;
