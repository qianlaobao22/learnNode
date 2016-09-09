var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var mongoose = require('mongoose')
var session = require('express-session')
var mongoStore = require('connect-mongo')(session)

var port = process.env.PORT || 3000
var app = express()
var dbUrl = 'mongodb://127.0.0.1/imooc'
var cookieParser = require('cookie-parser')
var logger = require('morgan')


mongoose.Promise = global.Promise
mongoose.connect(dbUrl)
app.use(cookieParser())
app.use(session({
    secret: 'imooc',
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({
        url:dbUrl,
        collection: 'sessions'

    })
}))

if('delelopment'===app.get('env')){
    app.set('showStackError') = true
    app.use(logger(':method :url :status'))
    app.locals.pretty = true
    mongoose.set('debug',true)
}

app.set('views','./app/views/other')
app.set('view engine','jade')
//app.use(express.bodyParser())
//app.use(bodyParser)

//app.use(bodyParser.urlencoded());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')))

app.locals.moment = require('moment')
app.listen(port)


console.log('imoo started on port '+port)


require('./config/routes')(app)