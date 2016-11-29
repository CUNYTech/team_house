const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('./user');

module.exports = function(mongoose) {
    var Post = new Schema({
        title: String,
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        imageURL: String,
        address:  {
            type: String,
            required: true
        },
        zipcode:  {
            type: String,
            required: true
        },
        rent: {
            type: String,
        },
        sale: {
            type: String,
        },
        content: {
            type: String,
            required: true
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }]
    }, {
        timestamps: true
    });

    var Comment = new Schema({
        content: {
            type: String,
            required: true
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    }, {
        timestamps: true
    });

    // declare seat covers here too
    var models = {
        Post: mongoose.model('Post', Post),
        Comment: mongoose.model('Comment', Comment)
    };

    return models;
};
