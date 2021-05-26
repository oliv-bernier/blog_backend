const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    articles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article"
    }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
