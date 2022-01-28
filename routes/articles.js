const express = require('express');
const router = express.Router();

const articlesCtrl = require('../controllers/articleController');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.get('/', articlesCtrl.getAllArticles);

router.post('/', auth, multer, articlesCtrl.createArticle);

router.get('/:id', articlesCtrl.getOneArticle);

router.put('/:id', auth, multer, articlesCtrl.modifyArticle);

router.delete('/:id', auth, articlesCtrl.deleteArticle)

router.get('/user/:id', articlesCtrl.getAllArticlesByUser);

module.exports = router;