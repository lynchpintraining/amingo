
//we are using requrie module, which will import an (express) package into your file. "require" fucntion comes from nodejs. any package that you creat you always put it at top
const express = require('express');
const bodyParser =  require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User');
const Products = require('./products'); //we just created this file to show that we will export something from product and use it here
const Feeds = require('./models/Feeds');

//create an express app. after importing, we are calling express function and it will assing this variable i.e. app, whole function and properties. 
const app = express()

//congiruation stage. telling expres to use body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json()); //body may contain json. we are telling this

//we are connecting to mongodb. we are using the package mongoose. without mongoose we have write log of code. with mongoose it is taken care
const db = 'mongodb+srv://dbadmin:lahore1977@cluster0-x9irx.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(db)

mongoose
.connect(db, {useNewUrlParser: true}) //connect function going to return a promise (promise allows JS to skip a code line andmove to next line of code. when promise is filled, JS comes back to that line of code)
.then(()=>{
console.log('DB is connected')
})
.catch((err)=>{
    console.log('error', err) //tis is to catch the error if any happens while connecting to mongoDB
})


/*app is an object. it now has function. we are looking at "get function". e.g route of files etc. in below: / is the path of file then the function is (callback function) asking  what you want me to day. 
first argument: route addres
second argument: callback
*/
app.get('/', (req, res) => {
  res.send("<h1>Weclome Home</h1>")
})
 
app.get('/about', (req, res) => {
    res.send("<h1>About Page</h1>"
    )
})

app.get('/contact', (req, res) => { //req is request and res is response
    res.send("<h1>Contact us @ +971-800800</h1>")
})

//dynamic page address now by adding colon : after forward slash
app.get('/blog/:page', (req, res) => { 
    const page = req.params.page; //to access the page`
    res.send("<h1>Welcome to " + page + "</h1>")
})


//backtick allows us to put.... /get-users?filter=2016&max=10 i.e. give me users from 2016 and maximum of 10. this is useful in API
app.get('/about', (req, res)=>{

    //we are using backtick in below 
    res.send(` 
                <h1>About Page</h1>
                <p>${req.query.section}</p>
                <p>${req.query.year}</p>
                <p>${req.query.industry}</p>
    `)

});


//post is when you want to give somehting to server. In postman when you can see more mothods. 
app.post('/register', (req, res) => {
    
    const formData = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password
    }
//create new user (code line 5 on top). 
    const newUser = new User(formData)

    newUser
    .save() //promise
    //if promise is fullfilled
    .then((newUserData) => {
    //send response in the form of JSON
        res.json(newUserData)
    })
    //otherwise do the following
    .catch((err) => {
        console.log('error', err);
    })   
   
})


app.post('/feeds', (req, res) => {
    
    const feedsData = {
        userName : req.body.userName,
        comment : req.body.comment,
        tags : req.body.tags,
        image : req.body.image,
        likes : req.body.likes,
        shares: req.body.shares,
    }
  
const newFeed = new Feeds(feedsData)
    newFeed
    .save() 
    .then((newFeedData) => {
        res.json(newFeedData)
    })
    
    .catch((err) => {
        console.log('error', err);
    })   
   
})

//it just turns on the server and connect to the port
app.listen(3000, () => {
    console.log('You are connected!')
})