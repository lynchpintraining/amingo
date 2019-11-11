const express = require('express');
const router = express.Router();
const CompanyModel = require('../models/CompanyModel');

router.post('/', (req, res)=>{

    const companyData = {
        companyName : req.body.companyName,
        noOfEmployees : req.body.noOfEmployees,
        location : req.body.location,
        contact : req.body.contact,
        logo : req.body.logo,

    }
   
    const newCompany= new CompanyModel(companyData)
    newCompany
    .save() 
    .then((newCompanyData) => {
        res.json(newCompanyData)
    })
    
    .catch((err) => {
        console.log('error', err);
    })   
   
})



module.exports = router;