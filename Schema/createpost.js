
const mongoose = require('mongoose');

// Schema for post creation  and will store data in data base in folder name ExistingPost
const createpost = mongoose.Schema({
    about: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Existinguser', required: true },
    like: { type: Number, required: true }
})


module.exports = mongoose.model("ExistingPost", createpost);