
var express = require('express');
var exphbs  = require('express-handlebars');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('public'));
 
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: false }));




app.get('/', function (req, res) {
    res.render('home');
});

app.get('/login', function (req, res) {
    res.render('login');
});

app.post('/login', function (req, res, next){
	req.session.user = req.body.user;
	if(req.session.user){
		var user = req.session.user;
	    	res.render('about', {
                user : user
            });
		
	}
	else{
		res.redirect('/login')
	}
});

app.get('/logout', function (req, res){
	var msg = "You have logged out";
	delete req.session.user;
	res.render('login',{
                msg : msg
    });
})
 
 app.get('/contact', function (req, checkUser, res) {
    res.render('contact');
});

var checkUser = function(req, res, next){
  if (req.session.user){
    return next();
  }
  else{
  	// the user is not logged in redirect him to the login page
  	res.redirect('login');
  }
};


app.listen(3000);
