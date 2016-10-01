var express        = require('express');
var app            = express();
var load           = require('express-load');
var bodyParser     = require('body-parser');
var router         = express.Router();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('router', router);
app.use(router);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, x-access-token");
	res.header('Cache-Control', 'no-cache');
next();
});

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

load('./controllers')
	.then('./routes')
	.into(app);

function redirectUnmatched(req, res) {
  res.redirect("/");
}

app.use(redirectUnmatched);


var socketController = app.controllers.socketController;

io.on('connection', function(socket){
  socketController.connectResponse(socket, io);
});

var port = process.env.PORT || 8081;

http.listen(port);

console.log('chat listening on port: ' + port);

exports = module.exports = app;
