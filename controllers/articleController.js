const Article = require('../models/Article');
const Category = require('../models/Category');
const User = require('../models/User');
const fs = require('fs');

exports.createArticle = (req, res, next) => {
	const articleObject = JSON.parse(req.body.article);
	const article = new Article({
			...articleObject,
			imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
	});
	article.save()
	.then((newArticle) => {
		return Category.findOneAndUpdate({ _id: articleObject.category }, {$push: {articles: newArticle}}, { new: true })
	})
	.then((newArticle) => {
		return User.findOneAndUpdate({ _id: articleObject.user }, {$push: {articles: newArticle}}, { new: true })
	})
	.then(() => res.status(201).json({ message: "Article créé" }))
	.catch(error => res.status(400).json({ error }));
};

exports.modifyArticle = (req, res, next) => {
	Article.findOne({ _id: req.params.id })
	.then(article => {
		const filename = article.imageUrl.split('/images/')[1];
		fs.unlink(`images/${filename}`, () => {
			const articleObject =  req.file ?
			{ 
				...JSON.parse(req.body.article),
				imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
			} : { ...req.body };
		Article.updateOne({ _id: req.params.id }, { ...articleObject, _id: req.params.id })
			.then(() => res.status(200).json({ message: 'Article modifié' }))
			.catch(error => res.status(400).json({ error }));
		})
	})
	.catch(error => res.status(500).json({ error }));
};

exports.deleteArticle= (req, res, next) => {
	Article.findOne({ _id: req.params.id })
		.then(article => {
			const filename = article.imageUrl.split('/images/')[1];
			fs.unlink(`images/${filename}`, () => {
				Article.deleteOne({ _id: req.params.id })
					.then(() => res.status(200).json({ message: 'Article supprimé' }))
					.catch(error => res.status(400).json({ error }));
			})
		})
		.catch(error => res.status(500).json({ error }));
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

exports.getAllArticlesByUser = (req, res, next) => {
  User.find({_id: req.params.id}).populate("articles")
    .then((user) => res.status(200).json({
			_id: user[0]._id,
			articles: user[0].articles,
			name: user[0].name,
		}))
    .catch(error => res.status(400).json({ error }));
};
