'use strict'

var bcrypt = require('bcrypt-nodejs')
var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var uniqueValidator = require('mongoose-unique-validator');

var emailValidator = [
	validate({
		validator:'isEmail',
	})
]

var passwordValidator = [
	validate({
		validator:'isLength',
		arguments:[6,125],
		message:'Password should be between 6 and 125 characters'
	}),
]

var usersSchema = mongoose.Schema({
 email:{type:String,required:true,validate:emailValidator,unique:true},
 password:{type:String,required:true,validate:passwordValidator},
 admin:{type:Boolean,required:true},
 _masjid:{type:String,required:false}
})

usersSchema.plugin(uniqueValidator);

var Users = mongoose.model('Users',usersSchema)

module.exports = Users

// var hash = bcrypt.hashSync("bacon");
 
// // bcrypt.compareSync("bacon", hash); // true
// // bcrypt.compareSync("veggies", hash); // false

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });