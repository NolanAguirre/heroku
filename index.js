var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

var routes = {
    index: require('./routes/index'),
    create_account : require('./routes/create_account'),
    login: require('./routes/login'),
    chat : require('./routes/chat')
}
app.set('socketio', io);
app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/create_account', routes.create_account);
app.use('/chat', routes.chat.chat);
app.put('/login', routes.login.login);
app.get('/', routes.index.index);
io.on('connection', function(socket){
    socket.on('message', function(data){
        console.log(data);
    })
})
server.listen(app.get('port'));
