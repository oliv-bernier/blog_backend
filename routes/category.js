const express = require('express');
const router = express.Router();

const categoryCtrl = require('../controllers/categoryController');

router.get('/', categoryCtrl.getAllCategories);

router.post('/', categoryCtrl.createCategory);

router.get('/:id/articles', categoryCtrl.getAllArticlesByCategory);

module.exports = router;