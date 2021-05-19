const Category = require('../models/Category');

exports.createCategory = (req, res, next) => {
  let newCategory = new Category(req.body);
  let savedCategory = newCategory.save();
  res.json(savedCategory);
};

exports.getAllCategories = (req, res, next) => {
	Category.find()
		.then(category => res.status(200).json(category))
		.catch(error => res.status(400).json({ error }));
};

exports.getAllArticlesByCategory = (req, res, next) => {
  Category.find({_id: req.params.id}).populate("articles")
    .then(articles => res.status(200).json(articles))
    .catch(error => res.status(400).json({ error }));
};