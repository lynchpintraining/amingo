
//we are using requrie module, which will import an (express) package into your file. "require" fucntion comes from nodejs. any package that you creat you always put it at top
const express = require('express');
const bodyParser =  require('body-parser'); //The body parser middleware is especially used to extract the body from the incoming requests. In short, it extracts the data out of the request headers like the form data, etc,.
const mongoose = require('mongoose');
const passport = require('passport'); //for authentication purpose for login features
const Products = require('./products'); //we just created this file to show that we will export something from product and use it here

const UserRoutes = require('./routes/UserRoutes');
const FeedRoutes = require('./routes/FeedRoutes');
const CompanyRoutes = require('./routes/CompanyRoutes');


const initPassportStrategy = require('./config/passport')//we are telling that we need authentication. what kind of authentiatino we  will need. all of this on the documentation of passport

//create an express app. after importing, we are calling express function and it will assing this variable i.e. app, whole function and properties. we are instantiating the express function
const app = express()

//configration stage. telling expres to use body parser. urlendcoded ==> if you have a url in quotes and has some spaces in the address then the space will be converted into %20. this will tell the broswer that it is space. This is required to have this is a space
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json()); //body may contain json. we are telling this
app.use(passport.initialize()); //we are telling express that we will be using passport
initPassportStrategy(passport); //passport-jwt

//we are connecting to mongodb. we are using the package mongoose. without mongoose we have write log of code. with mongoose it is taken care
const db = 'mongodb+srv://dbadmin:lahore1977@cluster0-x9irx.mongodb.net/test?retryWrites=true&w=majority';

mongoose
.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}) //we are now connecting it to a db. connect function going to return a promise (promise allows JS to skip a code line andmove to next line of code. when promise is filled, JS comes back to that line of code)
.then(()=>{
console.log('DB is connected')
})
.catch((err)=>{
    console.log('error', err) //tis is to catch the error if any happens while connecting to mongoDB
})

app.use(
    '/users', //http://example.com/uers/...
     UserRoutes,
);

app.use(
    '/feeds', 
    passport.authenticate('jwt', {session: false}),//specifying the authentication used 
     FeedRoutes
);

app.use(
    '/company',
    passport.authenticate('jwt', {session: false}),
    CompanyRoutes
    
)
/*We are creating the routes now. app is an object. it now has function. we are looking at "get function". e.g route of files etc. in below: / is the path of file then the function is (callback function) asking  what you want me to day. 
first argument: route addres
second argument: callback
*/
app.get('/', (req, res) => { //req is request. contains all info about client
  res.send("<h1>Weclome Home</h1>") // res is response and coming from express
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

    //we are using backtick in below. There are two ways to show data in JS. if uou want a string and plus sign to glue them together. single qyote and diube qyotes are same.  a third way is a backtick `. the advantage is backtic is you can take the variable and remove the plus sign and add variable insie quote. seod we have to communicate to js that this string is actually a varaible by wrapping around cryly braces and prefix it with a dollar sign
    res.send(` 
                <h1>About Page</h1>
                <p>${req.query.section}</p>
                <p>${req.query.year}</p>
                <p>${req.query.industry}</p>
    `)

});

app.get('*', (req, res) => {
    res.send("<h1>404 Error Page</h1>"
    )
})

//it just turns on the server and connect to the port
app.listen(3000, () => {
    console.log('You are connected!')
})