const express = require('express');
const router = express.Router();

const articlesCtrl = require('../controllers/articleController');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

// create
router.post('/', auth, multer, articlesCtrl.createArticle);
// update
router.put('/:id', auth, multer, articlesCtrl.modifyArticle);
// delet
router.delete('/:id', auth, articlesCtrl.deleteArticle)
// read one
router.get('/:id', articlesCtrl.getOneArticle);
// read all
router.get('/', articlesCtrl.getAllArticles);
// read all by user
router.get('/user/:id', articlesCtrl.getAllArticlesByUser);

module.exports = router;