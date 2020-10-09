const {Router} = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const fs = require('fs')
const path = require('path')


const User = require('../models').User
const Shop = require('../models').Shop
const Tarif = require('../models').Tarif
const Category = require('../models').Category
const Catalog = require('../models').Catalog
const Banner = require('../models').Banner


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

router.get('/use', (req, res) => {
    res.render('use', {
        title: 'Кому пригодится и как использовать | Simple platform Создай свой интернет магазин за 15 минут page',
    })
})

router.get('/login', (req, res) => {
    res.redirect('/auth/login')
})

router.get('/register', (req, res) => {
    res.redirect('/auth/register')
})

router.get('/register', (req, res) => {
    res.redirect('/auth/register')
})


// ROUTER SHOPS

router.get('/:code', async (req, res) => {
    const shopcode = req.params.code

    const shop = await Shop.findOne({where: {url: shopcode}})
    const banners = await Banner.findAll({where:{user_id: shop.user_id}})
    const catogorys = await Category.findAll({where:{user_id: shop.user_id}, order: [['id', 'ASC'],['name', 'ASC']]})
    const catalog = await Catalog.findAll({
        where:{user_id: shop.user_id}, 
        order: [['id', 'ASC'],['name', 'ASC']],
        limit: 50
    })
    if(shop == null){
        return res.status(404).render('404', {
            title: 'Страница не найдена'
        })
    }
    res.render('shop/main', {
        layout: 'shop',
        shop,
        banners,
        catogorys,
        catalog
    })
})


module.exports = router