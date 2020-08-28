const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Simple platform | Создай свой интернет магазин за 15 минут page',
    })
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'О компании и платформе Simple platform | Создай свой интернет магазин за 15 минут page',
    })
})

router.get('/price', (req, res) => {
    res.render('price', {
        title: 'Цены Simple platform | Создай свой интернет магазин за 15 минут page',
    })
})

router.get('/contacts', (req, res) => {
    res.render('contacts', {
        title: 'Связаться с Simple platform | Создай свой интернет магазин за 15 минут page',
    })
})

module.exports = router