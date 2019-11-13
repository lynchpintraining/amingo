//import mongoos. 
const mongoose = require('mongoose');

//Assign the Scheme object ==> scheme is the structure of the data that is goig to database. e.g. all fields of user form
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    occupation: {
        type : String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

//export the schema
//with mode you can perform oepratoins on schema
//follow the convention of using CAPTTAL FIRST letter of schema

//module.export is being used because once we create this mode then we have use in server.js
module.exports = User = mongoose.model('user', UserSchema); //we are using mongoos.model function to convert scheme to a mode. user is name of the collection. UseraScheme is what we created to get the information. 

//various mongoose functions https://mongoosejs.com/docs/queries.html

//username, comment, tags, image, likes, shares, date