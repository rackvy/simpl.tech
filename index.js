const express = require('express')
const path = require('path')
const fs = require('fs')
const exphbs = require('express-handlebars')
const Sequelize = require('sequelize')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)

const homeRoutes = require('./routes/home')
const authRoutes = require('./routes/auth')

const varMiddleware = require('./middleware/variables')
const { allowedNodeEnvironmentFlags } = require('process')

const sequelize = new Sequelize("alexey", "alexey", "", {
    dialect: "postgres",
    host: "localhost"
})

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
const PORT = process.env.PORT || 80

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.urlencoded({extended: true}))
app.use(session({
    store: new pgSession({
        conString : 'pg://alexey:@localhost/alexey'
    }),
    secret: 'dsf8cskb@E0asdf><35sfsakhg4@J',
    resave: false,
    saveUninitialized: false
}))
app.use(varMiddleware)



app.use('/', homeRoutes)
app.use('/auth', authRoutes)



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})