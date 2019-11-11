//this is a class exercise
//schema of data
//username, comment, tags, image, likes, shares, date
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedsSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        default: 0
    },
    image: {
        type: String,
        default: 0
    },
    likes: {
    type: Array,
    default: [] //this array will contains the id of the user who like this. so that we can then add the length of this array and display that how many are the likes for this post
    },
    shares: {
        type: Array,
        default: [] //this array will contains the id of the user who share this. so that we can then add the length of this array and display that how many are the shares for this post
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

module.exports = Feeds = mongoose.model('feeds', FeedsSchema);