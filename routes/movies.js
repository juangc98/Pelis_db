const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController')

router.get('/', moviesController.index);
router.get('/detail/:id', moviesController.detail);
router.get('/new', moviesController.new);
router.get('/recommended', moviesController.ranking);


module.exports = router;