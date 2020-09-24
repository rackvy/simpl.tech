var multer = require('multer')
var storage = multer.diskStorage({
    destination(req, file, cb) {
        var dir
        if(req._parsedOriginalUrl.path == '/panel/shop/add_logo'){
            dir = 'logo'
        }else{
            dir = 'catalog'
        }
        cb(null, 'dist/images/'+req.session.userId+'/'+dir+'/')
    },
    filename(req, file, cb){
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})
var allowedTypes = ['image/png','image/jpg','image/jpeg','image/svg', 'image/svg+xml']
var fileFilter = (req, file, cb) => {
    if(allowedTypes.includes(file.mimetype)){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

module.exports = multer({
    storage,
    fileFilter
})