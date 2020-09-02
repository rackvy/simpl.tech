const {Router} = require('express')
const router = Router()
const User = require('../models').User
const bcrypt = require('bcryptjs')

router.get('/', async (req, res) => {
    if(!req.session.isAuth){
        res.redirect('/auth/login/')
    }
    res.render('panel/panel', {
        layout: 'panel',
        title: 'Рабочий стол Simple platform',
        isHome: true
    })
})

router.get('/profile', async (req, res) => {
    if(!req.session.isAuth){
        res.redirect('/auth/login/')
    }
    //const user = await User.findOne({where:{id: req.session.userId}, raw: true})
    const user = await User.findByPk(req.session.userId)
    res.render('panel/profile', {
        layout: 'panel',
        title: 'Профиль пользователя',
        isProfile: true,
        user
    })
})

router.post('/profile', async (req, res) => {
    if(!req.session.isAuth){
        res.redirect('/auth/login/')
    }
    const {email, name, phone, password, id} = req.body
    const findUserByEmail = await User.findOne({where:{email: email}, raw: true})
    console.log(password);
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




module.exports = router