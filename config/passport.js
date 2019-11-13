const PassportJWT = require('passport-jwt');//we are specifuing the type of passport. we are sayiung here that it is jwt and all the login id will be in  string and it will be a token. 
const JwtStrategy = PassportJWT.Strategy;//we are encrypting here and will generate the JWT
const ExtractJwt = PassportJWT.ExtractJwt;//allows to retirvie the username an password from string. extract the payload
const secret = process.env.SECRET;//it will take info and it will then encrypt it. It will make a secret token for us. 

const UserModel = require('../models/User');//normally we do hide it finally and put it in other file. 

//option for passport-jwt. look for the jwt inside the bearertoken. 
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret //we are giving the secret to produce the web token
};

//we are passing hte strategy to passport and we are now perofrming the operations of this strategy
const initPassportStrategy = (passport) => {
    const theJwtStrategy = new JwtStrategy(opts, (jwtPayload, done)=>{ // when client send the token and then it wil lbe stored in jwtpayload

        //see if the uaser with the id existi (in th epayload)
        UserModel
        .findById(jwtPayload.id)
        .then((theUser)=>{
            //if user existis, rethen the user object
            if(theUser) {
                return done(null, theUser);
            }
            //otherwise return false
            else {
                return done(null, false);
            }
        })
        .catch((err)=>{
            console.log('error', err);
            return done(null, null);
        })
    });

    passport.use(theJwtStrategy)
}

module.exports = initPassportStrategy;
