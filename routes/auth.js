const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.redirect('/auth/login/')
})

router.get('/login', async (req, res) => {
    res.render('auth/login', {
        title: 'Авторизация | Simple platform Создай свой интернет магазин за 15 минут page',
    })
})

router.get('/register', async (req, res) => {
    res.render('auth/register', {
        title: 'Регистрация | Simple platform Создай свой интернет магазин за 15 минут page',
    })
})

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login')
    })
})

router.post('/login', async (req, res) => {
    req.session.isAuth = true
    req.session.save(err => {
        if(err) throw err
        res.redirect('/')
    })
    
})



module.exports = router