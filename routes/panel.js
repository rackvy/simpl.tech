const {Router} = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const fs = require('fs')
const path = require('path')

const auth = require('../middleware/auth')


const User = require('../models').User
const Shop = require('../models').Shop
const Tarif = require('../models').Tarif
const Category = require('../models').Category
const Catalog = require('../models').Catalog


router.get('/', auth, async (req, res) => {
    const user = await User.findByPk(req.session.userId)
    const shop = await Shop.findOne({where:{user_id: req.session.userId}, raw: true})
    const tarif = await Tarif.findByPk(user.tarif_id)

    res.render('panel/panel', {
        layout: 'panel',
        title: 'Рабочий стол Simple platform',
        isHome: true,
        user,
        shop,
        tarif
    })
})

router.get('/profile', auth,  async (req, res) => {
    const user = await User.findByPk(req.session.userId)
    const shop = await Shop.findOne({where:{user_id: req.session.userId}, raw: true})
    const tarif = await Tarif.findByPk(user.tarif_id)

    res.render('panel/profile', {
        layout: 'panel',
        title: 'Профиль пользователя',
        isProfile: true,
        user,
        shop,
        tarif
    })
})

router.get('/shop', auth,  async (req, res) => {
    const shop = await Shop.findOne({where:{user_id: req.session.userId}, raw: true})
    let user
    user = await User.findByPk(req.session.userId)
    const tarif = await Tarif.findByPk(user.tarif_id)

    res.render('panel/shop', {
        layout: 'panel',
        title: 'Ваш магазин',
        isShop: true,
        shop,
        user,
        tarif
    })
})

router.get('/shop/adress', auth,  async (req, res) => {
    const shop = await Shop.findOne({where:{user_id: req.session.userId}, raw: true})
    const user = await User.findByPk(req.session.userId)
    const shops = JSON.parse(shop.adresses)
    const tarif = await Tarif.findByPk(user.tarif_id)
    let count
    if(shops != null){
        count = shops.length
    }
    if(count == 0){count = 1}
    res.render('panel/shopadress', {
        layout: 'panel',
        title: 'Адреса магазинов',
        isShopAdress: true,
        shop,
        user,
        shops,
        count,
        tarif
    })
})

router.get('/shop/texts', auth,  async (req, res) => {
    const shop = await Shop.findOne({where:{user_id: req.session.userId}, raw: true})
    const user = await User.findByPk(req.session.userId)
    const texts = JSON.parse(shop.texts)
    const tarif = await Tarif.findByPk(user.tarif_id)

    res.render('panel/shoptexts', {
        layout: 'panel',
        title: 'Текста о доставке и об оплате',
        isShopTexts: true,
        shop,
        user,
        texts,
        tarif
    })
})

router.get('/catalog/categorys', auth,  async (req, res) => {
    const shop = await Shop.findOne({where:{user_id: req.session.userId}, raw: true})
    const user = await User.findByPk(req.session.userId)
    const tarif = await Tarif.findByPk(user.tarif_id)
    const cats = await Category.findAll({where:{user_id: req.session.userId}})

    res.render('panel/catalogCats', {
        layout: 'panel',
        title: 'Списко категорий',
        isCatalogCats: true,
        shop,
        user,
        tarif,
        cats
    })
})
    router.get('/catalog/categorys/delete/:id', auth,  async (req, res) => {
        const id = req.params.id
        Category.destroy({
            where: {
              id: id,
              user_id: req.session.userId
            }
          }).then((err) => {
            return res.redirect('/panel/catalog/categorys')
          })
    })

    router.get('/catalog/categorys/edit/:id', auth,  async (req, res) => {
        const id = req.params.id
        const category = await Category.findByPk(id)
        const shop = await Shop.findOne({where:{user_id: req.session.userId}, raw: true})
        const user = await User.findByPk(req.session.userId)
        const tarif = await Tarif.findByPk(user.tarif_id)
    
        res.render('panel/catalogCatsEdit', {
            layout: 'panel',
            title: 'Список категорий',
            isCatalogCats: true,
            shop,
            user,
            tarif,
            category
        })
    
    })


router.get('/catalog/items', auth,  async (req, res) => {
    const shop = await Shop.findOne({where:{user_id: req.session.userId}})
    const user = await User.findByPk(req.session.userId)
    const tarif = await Tarif.findByPk(user.tarif_id)
    const cats = await Category.findAll({where:{user_id: req.session.userId}})
    const catalog = await Catalog.findAll({where:{user_id: req.session.userId}})

    res.render('panel/catalogItems', {
        layout: 'panel',
        title: 'Список товаров '+catalog.length+'/'+tarif.items,
        isCatalogItem: true,
        shop,
        user,
        tarif,
        cats,
        catalog
    })
})
    
router.get('/catalog/items/new', auth,  async (req, res) => {
    const shop = await Shop.findOne({where:{user_id: req.session.userId}})
    const user = await User.findByPk(req.session.userId)
    const tarif = await Tarif.findByPk(user.tarif_id)
    const cats = await Category.findAll({where:{user_id: req.session.userId}})


    res.render('panel/catalogItemsNew', {
        layout: 'panel',
        title: 'Добавить новый товар',
        isCatalogItem: true,
        shop,
        user,
        tarif,
        cats
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

router.post('/shop/add_logo', auth, async (req, res) => {
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

router.post('/catalog/categorys', auth,  async (req, res) => {
    const {name, parent_cat, description} = req.body
    const shop = await Shop.findOne({where:{user_id: req.session.userId}, raw: true})
    const user = await User.findByPk(req.session.userId)
    const tarif = await Tarif.findByPk(user.tarif_id)
    if(name != null){
        const category = new Category({
            name: name,
            user_id: req.session.userId,
            paren_id: parent_cat,
            description: description
        })
        await category.save()
        return res.redirect('/panel/catalog/categorys')
    }else{
        return res.render('panel/catalogCats', {
            layout: 'panel',
            title: 'Списко категорий',
            isCatalogCats: true,
            shop,
            user,
            tarif,
            error: true,
            message: 'Поле "Название категории" обязательное'
        })
    }
    
})

router.post('/catalog/categorys/edit/:id', auth,  async (req, res) => {
    const id = req.params.id
    const result = await Category.update(
        {
            name: req.body.name,
            description: req.body.description
        },
        {where: {id: id}}
    )
    if(result == 1){
        res.redirect('/panel/catalog/categorys')
    }
})




router.post('/catalog/items/new/', auth, async (req, res) => {
    const catalog = await Catalog.findAll({where:{user_id: req.session.userId}})
    const shop = await Shop.findOne({where:{user_id: req.session.userId}, raw: true})
    const user = await User.findByPk(req.session.userId)
    const tarif = await Tarif.findByPk(user.tarif_id)
    const cats = await Category.findAll({where:{user_id: req.session.userId}})

    if(tarif.items <= catalog.length){
        return res.render('panel/catalogItemsNew', {
            layout: 'panel',
            title: 'Список товаров',
            isCatalogItem: true,
            shop,
            user,
            tarif,
            cats,
            error: true,
            message: 'Достигнуто максимальное количество товаров по вашему тарифу'
        })
    }
    const {active, name, cat_id, articul, price, description} = req.body
    const newItemCatalog = new Catalog({
        active: active,
        user_id: req.session.userId,
        name: name,
        cat_id: cat_id,
        articul: articul,
        price: price,
        description: description,
        picture: '/images/' + req.session.userId + '/catalog/' + req.file.filename,
    })
    await newItemCatalog.save()
    return res.redirect('/panel/catalog/items/')
})



module.exports = router