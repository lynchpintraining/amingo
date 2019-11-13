require('dotenv').config();

//we are using requrie module, which will import an (express) package into your file. "require" fucntion comes from nodejs. any package that you creat you always put it at top
const express = require('express');
const bodyParser =  require('body-parser'); //The body parser middleware is especially used to extract the body from the incoming requests. In short, it extracts the data out of the request headers like the form data, etc,.
const mongoose = require('mongoose');
const passport = require('passport'); //for authentication purpose for login features

//from routes we are exporting the objects from respoective routes.
const UserRoutes = require('./routes/UserRoutes');
const FeedRoutes = require('./routes/FeedRoutes');
const CompanyRoutes = require('./routes/CompanyRoutes');
const PageRoutes = require('./routes/PageRoutes');

//we are exporting our passport strategy 
const initPassportStrategy = require('./config/passport')//we are telling that we need authentication. what kind of authentiatino we  will need. all of this on the documentation of passport

//create an express app. after importing, we are calling express function and it will assing this variable i.e. app, whole function and properties. we are instantiating the express function. we have created our object app and put express function in it to have all the functions of express in our app
const app = express()

//configration stage. telling expres to use body parser. urlendcoded ==> if you have a url in quotes and has some spaces in the address then the space will be converted into %20. this will tell the broswer that it is space. This is required to have this is a space. bodyparser is a mechanism to send information to server
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json()); //body may contain json. we are telling this
app.use(passport.initialize()); //we are telling express that we will be using passport
initPassportStrategy(passport); //passport-jwt

//we are connecting to mongodb. we are using the package mongoose. without mongoose we have write log of code. with mongoose it is taken care. before deoploying to heroku it was const db = 'mongodb+srv://dbadmin:lahore1977@cluster0-x9irx.mongodb.net/test?retryWrites=true&w=majority';
//after deploying to heroku we changed it
const db = process.env.MONGO_URI;

//almost all functions of mongoose will be promise and hence will have .then in it
mongoose
.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}) //we are now connecting it to a db. connect function going to return a promise (promise allows JS to skip a code line andmove to next line of code. when promise is filled, JS comes back to that line of code)
.then(()=>{
console.log('DB is connected')
})
.catch((err)=>{
    console.log('error', err) //tis is to catch the error if any happens while connecting to mongoDB
})

//.use is method to communicate
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

app.use(
    '/',
    PageRoutes   
);

//it just turns on the server and connect to the port
app.listen(process.env.PORT || 3000, () => {
    console.log('You are connected!')
})

/*before deploying to heroku
app.listen(3000, () => {
    console.log('You are connected!')
})
*/