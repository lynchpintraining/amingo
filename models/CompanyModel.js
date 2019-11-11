const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    noOfEmployees: {
        type: Number,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    contact: {
        type : String
    },
    logo: {
        type: String,
    }
})

module.exports = Company = mongoose.model('company', CompanySchema); 
