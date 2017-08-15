var express = require('express');
var bcrypt = require('bcrypt-nodejs')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)


var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(require('res-error'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//APIS

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/expansion');

var db = mongoose.connection;
// db.on('error',console.error.bind(console,'#MongoDB - connection error')) // optional for professionalism
//SET UP SESSIONS must be after mongodb connection

var Users = require('./models/users')


//START USER APIS
app.post('/create',function(req,res){
	var user = req.body
	user.password = bcrypt.hashSync(user.password);

	Users.create(user,function(err,user){
		if(err){
			res.error(err)
		}
		else{
			let data = {_id:user._id,admin:user.admin}
			res.json(data)
		}
	})
})


//END APIS

app.listen(3001,function(err){
	if(err){
		return console.log('UserSERVER ERROR', err)
	}
	console.log('Users Server is listening on http://localhost:3001')
})