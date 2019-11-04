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
        type: String
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
    type: Number,
    default: 0
    },
    shares: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

module.exports = Feeds = mongoose.model('feeds', FeedsSchema);