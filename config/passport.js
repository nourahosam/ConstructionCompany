const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const model         = require('./model/user')
const User          = model.User
const validPassword = require('../lib/passwordUtils').validPassword;

const customFields = {
    usernameField: 'uname',
    passwordField: 'pw'
}

const verifyCallback = (username, password, done) => {
    User.findOne({ username: username }).then((user) => {
        if(!user) {return done(null, false)}
        const isValid = validPassword(password, user.hash, user.salt);

        if(isValid){ return done(null, user);}
        else { done(null, false);}
    }).catch((err) =>{
        done(err);
    });
}

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.deserializeUser((userIs, done) => {
    User.findById(userId).then((user) =>{
        done(null, user);
    }).catch(err => done(err))
});