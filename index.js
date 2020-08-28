const express = require('express'),
    path = require('path'),
    exphbs = require('express-handlebars')

const homeRoutes = require('./routes/home')


const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
const PORT = process.env.PORT || 80

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.static('dist'))


app.use('/', homeRoutes)



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})