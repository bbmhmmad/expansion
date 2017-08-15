'use strict'

var bcrypt = require('bcrypt-nodejs')
var mongoose = require('mongoose');
var validate = require('mongoose-validator');



var nameValidator = [
	validate({
		validator:'isLength',
		arguments:[15,125],
		message:'Name should be between 15 and 125 characters'
	}),
]

var masjidsSchema = mongoose.Schema({
 name:{type:String,required:true,validate:nameValidator,unique:true},
 center:{type:{},required:false,unique:true},
 coordinates:{type:Array,required:false}
})

masjidsSchema.plugin(uniqueValidator);

var Masjids = mongoose.model('Masjids',masjidsSchema)

module.exports = Masjids

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