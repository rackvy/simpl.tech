const {Router} = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const fs = require('fs')
const path = require('path')


const User = require('../models').User
const Shop = require('../models').Shop


router.get('/', async (req, res) => {
    if(!req.session.isAuth){
        res.redirect('/auth/login/')
    }
    user = await User.findByPk(req.session.userId)
    const shop = await Shop.findOne({where:{user_id: req.session.userId}, raw: true})
    res.render('panel/panel', {
        layout: 'panel',
        title: 'Рабочий стол Simple platform',
        isHome: true,
        user,
        shop
    })
})

router.get('/profile', async (req, res) => {
    if(!req.session.isAuth){
        res.redirect('/auth/login/')
    }
    const user = await User.findByPk(req.session.userId)
    const shop = await Shop.findOne({where:{user_id: req.session.userId}, raw: true})
    res.render('panel/profile', {
        layout: 'panel',
        title: 'Профиль пользователя',
        isProfile: true,
        user,
        shop
    })
})

router.get('/shop', async (req, res) => {
    if(!req.session.isAuth){
        res.redirect('/auth/login/')
    }
    const shop = await Shop.findOne({where:{user_id: req.session.userId}, raw: true})
    let user
    //if(shop == null){
    user = await User.findByPk(req.session.userId)
    //}
    
    res.render('panel/shop', {
        layout: 'panel',
        title: 'Ваш магазин',
        isShop: true,
        shop,
        user
    })
})


router.post('/profile', async (req, res) => {
    if(!req.session.isAuth){
        res.redirect('/auth/login/')
    }
    const {email, name, phone, password, id} = req.body
    const findUserByEmail = await User.findOne({where:{email: email}, raw: true})
    if(password){
        var hashPassword = await bcrypt.hash(password, 10)
    }else{
        var hashPassword = findUserByEmail['password']
    }
    if(id == req.session.userId){
        if(findUserByEmail['id'] == id || findUserByEmail['id'] == null){
            const result = await User.update(
                {
                    email: email,
                    name: name,
                    phone: phone,
                    password: hashPassword,
                },
                {where: {id: id}}
            )
            if(result == 1){
                const user = await User.findByPk(req.session.userId)
                res.render('panel/profile', {
                    layout: 'panel',
                    title: 'Профиль пользователя',
                    isProfile: true,
                    success: true,
                    message: 'Информация обновлена',
                    user
                })
            }
        }else{
            const user = await User.findByPk(req.session.userId)
            res.render('panel/profile', {
                layout: 'panel',
                title: 'Профиль пользователя',
                isProfile: true,
                error: true,
                message: 'Этот email занят другим пользователем',
                user
            })
        }
    }else{
        req.session.destroy(() => {
            res.redirect('/auth/login')
        })        
    }
})

router.post('/shop', async (req, res) => {
    if(!req.session.isAuth){
        res.redirect('/auth/login/')
    }
    const {shopid, user_id, name, email, phone, vk, fb, wa, telegram, instagram, url, description} = req.body
    if(shopid){
        const result = await Shop.update(
            {
                name: name,
                email: email,
                phone: phone,
                vk: vk,
                fb: fb,
                wa: wa,
                telegram: telegram,
                instagram: instagram,
                url: url,
                description: description
            },
            {where: {id: shopid}}
        )
        if(result == 1){
            res.redirect('/panel/shop')
        }
    }else{
        const shop = new Shop({
            user_id: user_id,
            name: name,
            email: email,
            phone: phone,
            vk: vk,
            fb: fb,
            wa: wa,
            telegram: telegram,
            instagram: instagram,
            url: url,
            description: description
        })
        await shop.save()
        await fs.mkdir(path.join(__dirname,'../', 'dist', 'images', `${shop.id}`), err => {
            if(err) throw new Error(err)
        })
        res.redirect('/panel/shop')
    }
})

router.post('/shop/add_logo', async (req, res) => {
    if(!req.session.isAuth){
        res.redirect('/auth/login/')
    }
    const result = await Shop.update(
        {
            logo: req.file.filename,
        },
        {where: {id: req.body.shopid}}
    )
    if(result == 1){
        res.redirect('/panel/shop')
    }
})

router.post('/shop/add_del_pay', async (req, res) => {
    if(!req.session.isAuth){
        res.redirect('/auth/login/')
    }
    if(Array.isArray(req.body.delivery) == false){
        req.body.delivery = [req.body.delivery]
    }
    
    if(Array.isArray(req.body.payment) == false){
        req.body.payment = [req.body.payment]
    }
    
    const data = {
        delivery: req.body.delivery,
        payment: req.body.payment
    }
    const result = await Shop.update(
        {
            params_del_pay: data,
        },
        {where: {id: req.body.shopid}}
    )
    if(result == 1){
        res.redirect('/panel/shop')
    }
})

router.post('/profile/change_tarif', async (req, res) => {
    if(!req.session.isAuth){
        res.redirect('/auth/login/')
    }
    const result = await User.update(
        {
            tarif_id: req.body.tarif_id,
        },
        {where: {id: req.body.id}}
    )
    if(result == 1){
        res.redirect('/panel/profile')
    }
})


module.exports = router