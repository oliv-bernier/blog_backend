const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String },
  author: { type: String, required: true },
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
   },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  }
},
{
  timestamps: true,
});

module.exports = mongoose.model('Article', articleSchema);

