const multer = require('multer')
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'dist/images/logos/')
    },
    filename(req, file, cb){
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})
const allowedTypes = ['image/png','image/jpg','image/jpeg','image/svg', 'image/svg+xml']
const fileFilter = (req, file, cb) => {
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