require('dotenv').config()
const express = require('express')
const path = require('path')
const csrf = require('csurf')
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars')
const Sequelize = require('sequelize')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const fs = require('fs')


const homeRoutes = require('./routes/home')
const authRoutes = require('./routes/auth')
const panelRoutes = require('./routes/panel')

const varMiddleware = require('./middleware/variables')
const errorHandler = require('./middleware/error')
const uploadfilesMiddleware = require('./middleware/files')
const { allowedNodeEnvironmentFlags } = require('process')

const sequelize = new Sequelize('postgres://'+ process.env.DB_USER +':'+process.env.DB_PASS+'@'+process.env.DB_HOST+':5432/'+process.env.DB_NAME)

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
        if_eq: function(a, b, opts) {
            if (a == b) {
                return opts.fn(this)
            } else {
                return opts.inverse(this)
            }
        },
        encodeMyString: function(inputData){
            return new Handlebars.SafeString(inputData)
        },
        multiply: function(a, b){
            return Number(a) * Number(b)
        }
    }
})

const PORT = process.env.PORT || 80

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.urlencoded({extended: true}))
app.use(session({
    store: new pgSession({
        conString : 'postgres://'+ process.env.DB_USER +':'+process.env.DB_PASS+'@'+process.env.DB_HOST+':5432/'+process.env.DB_NAME
    }),
    secret: process.env.DB_SECRET,
    resave: true,
    saveUninitialized: true
}))
app.use(uploadfilesMiddleware.single('file'))

app.use(csrf())
app.use(varMiddleware)

app.use('/auth', authRoutes)
app.use('/panel', panelRoutes)
app.use('/', homeRoutes)
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})