// imports
const path          = require('path')
const express       = require('express')
const session       = require('express-session')
var passport        = require('passport')
var crypto          = require('crypto')
const mongoose      = require('mongoose')
const app           = express()
var routes          = require('./routes')
const model = require('./model/user')
const User = model.User


mongoose.connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true });
const MongoStore = require('connect-mongo')(session);
const sessionStore = new MongoStore({ mongooseConnection:mongoose.connection
    .once('open', ()=>{ console.info("Connected") })
    .on('error', (error)=>{ console.info("Your error is ", error)}), collection: 'sessions'})
const port = 3000


//DATABASE


//MIDDLEWARE
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(express.static("public"))
app.use('/css', express.static(__dirname+ '/public/css'))
app.use('/js', express.static(__dirname+ '/public/js'))

app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000*60*60*24
    }
}))




//PASSPORT
require('./config/passport');
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
});

app.use(routes);


// app.get('', (req, res) =>{
// res.render('login')
// })

app.listen(port, () => console.info(`Listening on port ${port}`))