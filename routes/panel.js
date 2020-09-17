const {Router} = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const fs = require('fs')
const path = require('path')

const auth = require('../middleware/auth')


const User = require('../models').User
const Shop = require('../models').Shop


router.get('/', auth, async (req, res) => {
    const user = await User.findByPk(req.session.userId)
    const shop = await Shop.findOne({where:{user_id: req.session.userId}, raw: true})
    res.render('panel/panel', {
        layout: 'panel',
        title: 'Рабочий стол Simple platform',
        isHome: true,
        user,
        shop
    })
})

router.get('/profile', auth,  async (req, res) => {
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

router.get('/shop', auth,  async (req, res) => {
    const shop = await Shop.findOne({where:{user_id: req.session.userId}, raw: true})
    let user
    user = await User.findByPk(req.session.userId)
    
    res.render('panel/shop', {
        layout: 'panel',
        title: 'Ваш магазин',
        isShop: true,
        shop,
        user
    })
})

router.get('/shop/adress', auth,  async (req, res) => {
    const shop = await Shop.findOne({where:{user_id: req.session.userId}, raw: true})
    const user = await User.findByPk(req.session.userId)
    const shops = JSON.parse(shop.adresses)
    let count = shops.length
    if(count == 0){count = 1}
    res.render('panel/shopadress', {
        layout: 'panel',
        title: 'Адреса магазинов',
        isShopAdress: true,
        shop,
        user,
        shops,
        count
    })
})

router.get('/shop/texts', auth,  async (req, res) => {
    const shop = await Shop.findOne({where:{user_id: req.session.userId}, raw: true})
    const user = await User.findByPk(req.session.userId)
    const texts = JSON.parse(shop.texts)
    res.render('panel/shoptexts', {
        layout: 'panel',
        title: 'Адреса магазинов',
        isShopAdress: true,
        shop,
        user,
        texts
    })
})


router.post('/profile', auth, async (req, res) => {
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

router.post('/shop', auth, async (req, res) => {
    const {shopid, user_id, name, email, phone, vk, fb, wa, telegram, instagram, url, description} = req.body
    let findShopByUrl = await Shop.findOne({where:{url: url}, raw: true})
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
                description: description
            },
            {where: {id: shopid}}
        )
        if(result == 1){
            res.redirect('/panel/shop')
        }
    }else{
        if(findShopByUrl == null){
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
            await fs.mkdir(path.join(__dirname,'../', 'dist', 'images', `${user_id}`), err => {
                if(err) throw new Error(err)
                fs.mkdir(path.join(__dirname,'../', 'dist', 'images', `${user_id}`, 'logo'), err => {
                    if(err) throw new Error(err)
                })
                fs.mkdir(path.join(__dirname,'../', 'dist', 'images', `${user_id}`, 'catalog'), err => {
                    if(err) throw new Error(err)
                })
            })
            res.redirect('/panel/shop')
        }else{
            res.redirect('/panel/shop?url=error')
        }
        
        
    }
})

router.post('/shop/add_logo', auth,  async (req, res) => {
    const result = await Shop.update(
        {
            logo: '/images/' + req.session.userId + '/logo/' + req.file.filename,
        },
        {where: {id: req.body.shopid}}
    )
    if(result == 1){
        res.redirect('/panel/shop')
    }
})

router.post('/shop/add_del_pay', auth,  async (req, res) => {
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

router.post('/profile/change_tarif', auth,  async (req, res) => {
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


router.post('/shop/adress', auth,  async (req, res) => {

    const result = await Shop.update(
        {
            adresses: JSON.stringify(req.body.shops),
        },
        {where: {id: req.body.shopid}}
    )
    if(result == 1){
        res.redirect('/panel/shop/adress/?success')
    }

})


router.post('/shop/texts', auth,  async (req, res) => {
    const result = await Shop.update(
        {
            texts: JSON.stringify(req.body.texts),
        },
        {where: {id: req.body.shopid}}
    )
    if(result == 1){
        res.redirect('/panel/shop/texts/?success')
    }

})




module.exports = router