// schema for the database


const mongoose = require('mongoose');

const Schema = mongoose.Schema; // getting an instance of mongoose schema


const userSchema = new Schema({
    email: String,
    password: String
})


module.exports = mongoose.model('user', userSchema, 'users');

// user is the database model
// users is the collection in data base