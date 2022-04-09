const router        = require('express').Router();
const passport      = require('passport');
const genPassword   = require('../lib/passwordUtils').genPassword;
const model         = require('./model/user')
const User          = model.User
const isAuth        = require('./authMiddleware').isAuth;
const isAdmin       = require('./authMiddleware').isAdmin;

router.post('/login',passport.authenticate('local', {failureRedirect: '/login-failure', successRedirect: 'login-success'}));


router.post('/register', (req, res, next) => {
    const saltHash = genPassword(req.body.pw);
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.bosy.username,
        hash: hash,
        salt: salt,
        admin: true
    });

    newUser.save().then((user) => {
        console.log(user);
    });
    res.redirect('/login');
});

//////// GET

router.get('/', (req, res, next) =>{
    res.render('login')
})

router.get('/register', (req, res, next)=>{
    res.render('register')
})

router.get('/protected-route', isAuth, (req, res, next) => {
    res.send('You made it to the route.');
});

router.get('/admin-route', isAdmin, (req, res, next) => {
    res.send('You made it to the admin route.');
});

// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/protected-route');
});

router.get('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});

module.exports = router;