const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  articles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article"
  }]
});

module.exports = mongoose.model('Category', categorySchema);
