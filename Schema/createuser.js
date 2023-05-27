const mongoose = require('mongoose')

// Schema for User create  and will store data in data base in folder name ExistingUser

const createuser = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})


module.exports = mongoose.model("Existinguser", createuser)