const Article = require('../models/Article');
const Category = require('../models/Category');
const User = require('../models/User');

exports.createArticle = (req, res, next) => {
	const article = new Article({
			...req.body,
	});
	article.save()
	.then((newArticle) => {
		return Category.findOneAndUpdate({ _id: req.body.category }, {$push: {articles: newArticle}}, { new: true })
	})
	.then((newArticle) => {
		return User.findOneAndUpdate({ _id: req.body.user }, {$push: {articles: newArticle}}, { new: true })
	})
	.then((dbCategory) => res.status(201).json(dbCategory))
	.catch(error => res.status(400).json({ error }));
};

exports.modifyArticle = (req, res, next) => {
		Article.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
		.then(() => res.status(200).json({ message: 'Article modifié' }))
		.catch(error => res.status(400).json({ error }));
};

exports.deleteArticle= (req, res, next) => {
		Article.deleteOne({ _id: req.params.id })
		.then(() => res.status(200).json({ message: 'Article supprimé' }))
		.catch(error => res.status(400).json({ error }));
};

exports.getOneArticle = (req, res, next) => {
	Article.findOne({ _id: req.params.id }).populate("category").populate("user", "-password")
		.then(article => res.status(200).json(article))
		.catch(error => res.status(404).json({ error }));
};

exports.getAllArticles = (req, res, next) => {
	Article.find().populate("category").populate("user", "-password")
		.then(article => res.status(200).json(article))
		.catch(error => res.status(400).json({ error }));
};