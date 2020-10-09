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


router.get('/shop', async (req, res) => {
    const shopcode = req.body
    console.log(shopcode);

    res.render('panel/panel', {
        layout: 'panel',
        title: 'Рабочий стол Simple platform',
        isHome: true,
    })
})


module.exports = router