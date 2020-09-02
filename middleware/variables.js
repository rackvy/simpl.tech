module.exports = function(req, res, next) {
    res.locals.isAuth = req.session.isAuth
    res.locals.userId = req.session.userId
    res.locals.csrf = req.csrfToken()

    next()
}