module.exports = function(req, res, next) {
    res.locals.isAuth = req.session.isAuth
    res.locals.user = req.session.user
    res.locals.csrf = req.csrfToken()

    next()
}