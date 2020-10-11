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
    if(shop == null){
        return res.status(404).render('404', {
            title: 'Страница не найдена'
        })
    }

    const banners = await Banner.findAll({where:{user_id: shop.user_id}})
    const catogorys = await Category.findAll({where:{user_id: shop.user_id}, order: [['id', 'ASC'],['name', 'ASC']]})
    const catalog = await Catalog.findAll({
        where:{user_id: shop.user_id}, 
        order: [['id', 'ASC'],['name', 'ASC']],
        limit: 50
    })
    res.render('shop/main', {
        layout: 'shop',
        shop,
        banners,
        catogorys,
        catalog
    })
})

router.get('/:code/catalog', async (req, res) => {
    const shopcode = req.params.code

    const shop = await Shop.findOne({where: {url: shopcode}})
    if(shop == null){
        return res.status(404).render('404', {
            title: 'Страница не найдена'
        })
    }
    const banners = await Banner.findAll({where:{user_id: shop.user_id}})
    const catogorys = await Category.findAll({where:{user_id: shop.user_id}, order: [['id', 'ASC'],['name', 'ASC']]})
    res.render('shop/catalog', {
        layout: 'shop',
        shop,
        banners,
        catogorys
    })
})

router.get('/:code/catalog/section', async (req, res) => {
    const shopcode = req.params.code

    const shop = await Shop.findOne({where: {url: shopcode}})
    if(shop == null){
        return res.status(404).render('404', {
            title: 'Страница не найдена'
        })
    }
    res.redirect('/' + shopcode + '/catalog')
})

router.get('/:code/catalog/section/:id', async (req, res) => {
    const shopcode = req.params.code

    const shop = await Shop.findOne({where: {url: shopcode}})
    if(shop == null){
        return res.status(404).render('404', {
            title: 'Страница не найдена'
        })
    }
    const idCat = req.params.id
    const catalog = await Catalog.findAll({
        where:{user_id: shop.user_id, cat_id: idCat}, 
        order: [['id', 'ASC'],['name', 'ASC']],
        limit: 50
    })
    const catogory = await Category.findOne({where: {id: idCat, user_id: shop.user_id}})
    res.render('shop/catalog-section', {
        layout: 'shop',
        shop,
        catogory,
        catalog,
        title: catogory.name
    })
})

router.get('/:code/catalog-detail/', async (req, res) => {
    const shopcode = req.params.code

    const shop = await Shop.findOne({where: {url: shopcode}})
    if(shop == null){
        return res.status(404).render('404', {
            title: 'Страница не найдена'
        })
    }
    res.redirect('/' + shopcode + '/catalog')
})

router.get('/:code/catalog-detail/:id', async (req, res) => {
    const shopcode = req.params.code

    const shop = await Shop.findOne({where: {url: shopcode}})
    if(shop == null){
        return res.status(404).render('404', {
            title: 'Страница не найдена'
        })
    }
    const item_id = req.params.id
    const item = await Catalog.findOne({where:{user_id: shop.user_id, id: item_id}})
    const catogory = await Category.findOne({where: {id: item.cat_id, user_id: shop.user_id}})
    res.render('shop/catalog-item', {
        layout: 'shop',
        shop,
        catogory,
        item,
        title: item.name
    })
})

router.get('/:code/contacts/', async (req, res) => {
    const shopcode = req.params.code

    const shop = await Shop.findOne({where: {url: shopcode}})
    if(shop == null){
        return res.status(404).render('404', {
            title: 'Страница не найдена'
        })
    }
    const shops = JSON.parse(shop.adresses)
    res.render('shop/contacts', {
        layout: 'shop',
        shop,
        shops,
        title: 'Контакты ' + shop.name
    })
})

router.get('/:code/payment_delivery/', async (req, res) => {
    const shopcode = req.params.code

    const shop = await Shop.findOne({where: {url: shopcode}})
    if(shop == null){
        return res.status(404).render('404', {
            title: 'Страница не найдена'
        })
    }
    const texts = JSON.parse(shop.texts)

    res.render('shop/payment_delivery', {
        layout: 'shop',
        shop,
        texts,
        title: 'Оплата и доставка'
    })
})


module.exports = router