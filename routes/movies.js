const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

//Para incluir archivos (imagenes)
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../img/products'))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage
})

// MANEJADOR DE RUTAS
router.get('/', moviesController.index);

router.get('/new', moviesController.new);
router.get('/recommended', moviesController.ranking);
router.get('/search', moviesController.search);

router.get('/detail/:id', moviesController.detail);
router.post('/detail/:id', moviesController.delete);
router.get('/detail/:id/edit', moviesController.edit);
router.post('/detail/:id/edit', upload.any(), moviesController.save);



module.exports = router;