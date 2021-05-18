const express = require('express');
const router = express.Router();

const articlesCtrl = require('../controllers/articleController');
// const auth = require('../middlewares/auth');

// create
router.post('/', articlesCtrl.createArticle);
// update
router.put('/:id', articlesCtrl.modifyArticle);
// delet
router.delete('/:id', articlesCtrl.deleteArticle)
// read one
router.get('/:id', articlesCtrl.getOneArticle);
// read all
router.get('/', articlesCtrl.getAllArticles);

module.exports = router;